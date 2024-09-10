'use client'
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, deleteDoc, addDoc, query, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebaseConfig';
import { useRouter } from 'next/navigation'; // Import Next.js router for redirection
import { Tab } from '@headlessui/react';
import { Menu, Transition } from '@headlessui/react';
import { TrashIcon, ChevronDownIcon, ChevronUpIcon, UserCircleIcon, PencilIcon, DotsVerticalIcon, CheckIcon, XIcon } from '@heroicons/react/solid';
import React, { Fragment } from 'react';

interface Comment {
    id: string;
    content: string;
    userId: string;
    timestamp: Date;
    isAdminResponse: boolean;
}

interface Ticket {
    id: string;
    userId: string;
    title: string;
    description: string;
    timestamp: Date;
    contactInfo: string;
    comments: Comment[];
}

type HeaderProps = {
    user: any; // You can adjust the type based on your user object
};

const Header = ({ user }: HeaderProps) => {
    const handleSignOut = async () => {
        await signOut(auth);
        window.location.href = '/login';
    };

    const handleEditProfile = () => {
        window.location.href = '/profile/edit';
    };

    return (
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
            <div className="flex items-center">
                <h1 className="text-4xl md:text-6xl font-sans leading-tight text-black">
                    Projects
                </h1>
            </div>
            <div className="flex items-center space-x-6">
                <button
                    onClick={handleSignOut}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                >
                    Sign Out
                </button>

                <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center space-x-2 focus:outline-none">
                        <UserCircleIcon className="w-10 h-10 text-gray-600" />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleEditProfile}
                                        className={`${active ? 'bg-gray-100' : ''
                                            } group flex items-center w-full px-4 py-2 text-sm text-black transition duration-200`}
                                    >
                                        <PencilIcon className="w-5 h-5 mr-2" />
                                        Edit Profile
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </header>
    );
};

export default function AdminDashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null); // Track expanded ticket
    const [newComment, setNewComment] = useState<string>(''); // For adding new comments
    const [isEditing, setIsEditing] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editedCommentContent, setEditedCommentContent] = useState('');
    const router = useRouter(); // Use Next.js router for navigation

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Check if the user is an admin
                if (user.email === 'nolanetaft@gmail.com') { // Replace with your admin email(s)
                    setUser(user);

                    // Fetch all tickets
                    const q = query(collection(db, 'tickets'));
                    const querySnapshot = await getDocs(q);

                    const fetchedTickets: Ticket[] = [];
                    for (const docSnap of querySnapshot.docs) {
                        const data = docSnap.data();
                        const ticketComments: Comment[] = [];

                        // Fetch user details based on userId
                        const userDocRef = doc(db, 'users', data.userId);
                        const userDocSnap = await getDoc(userDocRef);
                        const contactInfo = userDocSnap.exists() ? userDocSnap.data().email : 'No contact info';

                        // Fetch comments for each ticket
                        const commentsQuery = query(collection(db, 'tickets', docSnap.id, 'comments'));
                        const commentsSnapshot = await getDocs(commentsQuery);
                        commentsSnapshot.forEach((commentDoc) => {
                            const commentData = commentDoc.data();
                            ticketComments.push({
                                id: commentDoc.id,
                                content: commentData.content,
                                userId: commentData.userId as string, // Ensure userId is a string
                                timestamp: commentData.timestamp.toDate(),
                                isAdminResponse: commentData.isAdminResponse || false,
                            });
                        });

                        // Sort comments by timestamp (ascending)
                        ticketComments.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

                        fetchedTickets.push({
                            id: docSnap.id,
                            userId: data.userId as string, // Ensure userId is a string
                            title: data.title,
                            description: data.description,
                            timestamp: data.timestamp.toDate(),
                            contactInfo,
                            comments: ticketComments,
                        });
                    }
                    setTickets(fetchedTickets);
                    setLoading(false);
                } else {
                    // Redirect non-admin users to the regular dashboard
                    window.location.href = '/dashboard';
                }
            } else {
                window.location.href = '/login';
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleExpandTicket = (ticketId: string) => {
        setExpandedTicketId(expandedTicketId === ticketId ? null : ticketId); // Toggle expansion
    };

    const handleDeleteTicket = async (ticketId: string) => {
        await deleteDoc(doc(db, 'tickets', ticketId));
        setTickets(tickets.filter(ticket => ticket.id !== ticketId));
    };

    const handleAddComment = async (ticketId: string) => {
        if (newComment.trim() === '') return;

        const commentDocRef = await addDoc(collection(db, 'tickets', ticketId, 'comments'), {
            content: newComment,
            userId: user?.uid as string, // Ensure userId is a string
            timestamp: new Date(),
            isAdminResponse: true, // Mark this comment as an admin response
        });

        setTickets(tickets.map(ticket =>
            ticket.id === ticketId ? {
                ...ticket,
                comments: [...ticket.comments, {
                    id: commentDocRef.id,
                    content: newComment,
                    userId: user?.uid as string, // Ensure userId is a string
                    timestamp: new Date(),
                    isAdminResponse: true,
                }].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()) // Sort comments by timestamp
            } : ticket
        ));
        setNewComment('');
    };

    const handleEditComment = (commentId: string, content: string) => {
        setEditingCommentId(commentId);
        setEditedCommentContent(content);
    };

    const handleConfirmEditComment = async (commentId: string) => {
        const commentDocRef = doc(db, 'tickets', expandedTicketId!, 'comments', commentId);
        await setDoc(commentDocRef, { content: editedCommentContent }, { merge: true });

        setTickets(tickets.map(ticket =>
            ticket.id === expandedTicketId ? {
                ...ticket,
                comments: ticket.comments.map(comment =>
                    comment.id === commentId ? { ...comment, content: editedCommentContent } : comment
                )
            } : ticket
        ));
        setEditingCommentId(null);
        setEditedCommentContent('');
    };

    const handleCancelEditComment = () => {
        setEditingCommentId(null);
        setEditedCommentContent('');
    };

    const handleDeleteComment = async (commentId: string) => {
        const commentDocRef = doc(db, 'tickets', expandedTicketId!, 'comments', commentId);
        await deleteDoc(commentDocRef);

        setTickets(tickets.map(ticket =>
            ticket.id === expandedTicketId ? {
                ...ticket,
                comments: ticket.comments.filter(comment => comment.id !== commentId)
            } : ticket
        ));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <svg className="animate-spin -ml-1 mr-3 h-16 w-16 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    return (
        <div>
            <Header user={user} />
            <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg bg-white text-black border border-black mt-10">
                <h1 className="text-4xl md:text-6xl font-sans leading-tight mb-10 text-center">
                    Admin Dashboard
                </h1>

                <Tab.Group>
                    <div className="overflow-x-auto max-w-full">
                        <Tab.List className="flex space-x-4 border-b">
                            {tickets.map((ticket) => (
                                <Tab key={ticket.id} className={({ selected }) =>
                                    `py-2 px-4 font-semibold border-b-2 ${selected ? 'border-black text-black' : 'border-transparent text-gray-500'}`
                                }>
                                    {ticket.userId}
                                </Tab>
                            ))}
                        </Tab.List>
                    </div>

                    <Tab.Panels className="mt-4">
                        {tickets.map((ticket) => (
                            <Tab.Panel key={ticket.id}>
                                <div className="bg-gray-100 p-4 rounded-lg border border-black">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-2xl font-semibold mb-4">Ticket Details</h2>
                                            <p><strong>Title:</strong> {ticket.title}</p>
                                            <p><strong>Description:</strong> {ticket.description}</p>
                                            <p><strong>Contact Info:</strong> {ticket.contactInfo}</p>
                                            <p><strong>Opened On:</strong> {new Date(ticket.timestamp).toLocaleDateString()}</p>
                                        </div>
                                        <button
                                            onClick={() => handleExpandTicket(ticket.id)}
                                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center"
                                        >
                                            {expandedTicketId === ticket.id ? <ChevronUpIcon className="w-5 h-5 mr-2" /> : <ChevronDownIcon className="w-5 h-5 mr-2" />}
                                            {expandedTicketId === ticket.id ? 'Collapse' : 'Expand'}
                                        </button>
                                    </div>

                                    {expandedTicketId === ticket.id && (
                                        <div className="mt-4">
                                            <h3 className="text-xl font-semibold">Comments</h3>
                                            <ul className="space-y-2 mt-2">
                                                {ticket.comments.map(comment => (
                                                    <li
                                                        key={comment.id}
                                                        className={`p-3 rounded-lg ${comment.isAdminResponse
                                                            ? 'bg-blue-100 border-l-4 border-blue-500'
                                                            : 'bg-gray-200'
                                                            } relative`}
                                                    >
                                                        {editingCommentId === comment.id ? (
                                                            <>
                                                                <textarea
                                                                    value={editedCommentContent}
                                                                    onChange={(e) => setEditedCommentContent(e.target.value)}
                                                                    className="p-2 border rounded-lg bg-gray-100 border-black my-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out w-full mb-2"
                                                                />
                                                                <div className="flex justify-end space-x-2">
                                                                    <button
                                                                        onClick={() => handleConfirmEditComment(comment.id)}
                                                                        className="flex items-center bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-700 transition-all duration-200 ease-in-out"
                                                                    >
                                                                        <CheckIcon className="w-4 h-4 mr-1" />
                                                                        Confirm
                                                                    </button>
                                                                    <button
                                                                        onClick={handleCancelEditComment}
                                                                        className="flex items-center bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition-all duration-200 ease-in-out"
                                                                    >
                                                                        <XIcon className="w-4 h-4 mr-1" />
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p>{comment.content}</p>
                                                                <p className="text-sm text-gray-500">
                                                                    {comment.isAdminResponse ? 'Admin Response' : 'User Response'} -{' '}
                                                                    {new Date(comment.timestamp).toLocaleString()}
                                                                </p>

                                                                {/* Conditionally render the three dots menu for admin responses */}
                                                                {comment.isAdminResponse && (
                                                                    <div className="absolute top-2 right-4 flex space-x-2">
                                                                        <Menu as="div" className="relative">
                                                                            <Menu.Button className="flex items-center space-x-2 focus:outline-none">
                                                                                <DotsVerticalIcon className="w-5 h-5 text-gray-600" />
                                                                            </Menu.Button>
                                                                            <Transition
                                                                                as={Fragment}
                                                                                enter="transition ease-out duration-100"
                                                                                enterFrom="transform opacity-0 scale-95"
                                                                                enterTo="transform opacity-100 scale-100"
                                                                                leave="transition ease-in duration-75"
                                                                                leaveFrom="transform opacity-100 scale-100"
                                                                                leaveTo="transform opacity-0 scale-95"
                                                                            >
                                                                                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                                                                    <Menu.Item>
                                                                                        {({ active }) => (
                                                                                            <button
                                                                                                onClick={() => handleEditComment(comment.id, comment.content)}
                                                                                                className={`${active ? 'bg-gray-100' : ''
                                                                                                    } group flex items-center w-full px-4 py-2 text-sm text-black transition duration-200`}
                                                                                            >
                                                                                                <PencilIcon className="w-5 h-5 mr-2" />
                                                                                                Edit
                                                                                            </button>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                    <Menu.Item>
                                                                                        {({ active }) => (
                                                                                            <button
                                                                                                onClick={() => handleDeleteComment(comment.id)}
                                                                                                className={`${active ? 'bg-gray-100' : ''
                                                                                                    } group flex items-center w-full px-4 py-2 text-sm text-black transition duration-200`}
                                                                                            >
                                                                                                <TrashIcon className="w-5 h-5 mr-2" />
                                                                                                Delete
                                                                                            </button>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                </Menu.Items>
                                                                            </Transition>
                                                                        </Menu>
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                            <textarea
                                                placeholder="Add a comment..."
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                className="p-3 border rounded-lg bg-gray-100 border-black text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out w-full mt-4"
                                            />
                                            <button
                                                onClick={() => handleAddComment(ticket.id)}
                                                className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center"
                                            >
                                                Add Comment
                                            </button>
                                        </div>
                                    )}


                                    <button
                                        onClick={() => handleDeleteTicket(ticket.id)}
                                        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center"
                                    >
                                        <TrashIcon className="w-5 h-5 mr-2" />
                                        Delete Ticket
                                    </button>
                                </div>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div >
        </div >
    );
}
