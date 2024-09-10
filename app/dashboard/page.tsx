'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { collection, doc, setDoc, deleteDoc, addDoc, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../lib/firebaseConfig';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon, PencilIcon, TrashIcon, CheckIcon, XIcon, UserCircleIcon } from '@heroicons/react/solid';
import React from 'react';

interface Comment {
    id: string;
    content: string;
    userId: string | undefined;
    timestamp: any;  // Adjusted type to reflect Firestore's Timestamp type
    isAdminResponse: boolean;
}

interface Ticket {
    id: string;
    title: string;
    description: string;
    timestamp: Date;
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
                    <Menu.Item >
                        <UserCircleIcon className="w-10 h-10 text-gray-600" />
                    </Menu.Item>
                    <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                       
                    </Transition>
                </Menu>
            </div>
        </header>
    );
};

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editedCommentContent, setEditedCommentContent] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);

                if (user.email === 'nolanetaft@gmail.com') {
                    window.location.href = '/dashboard/admin';
                } else {
                    const q = query(collection(db, 'tickets'), where('userId', '==', user.uid));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const ticketDoc = querySnapshot.docs[0];
                        const ticketData = ticketDoc.data() as Ticket;
                        setTicket({
                            ...ticketData,
                            id: ticketDoc.id,
                        });
                        setTitle(ticketData.title);
                        setDescription(ticketData.description);

                        const commentsSnapshot = await getDocs(collection(db, 'tickets', ticketDoc.id, 'comments'));
                        const fetchedComments = commentsSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        } as Comment));

                        // Sort comments by timestamp (convert Firestore Timestamp to JavaScript Date)
                        fetchedComments.sort((a, b) => a.timestamp.toDate().getTime() - b.timestamp.toDate().getTime());
                        setComments(fetchedComments);
                    }

                    setLoading(false);
                }
            } else {
                window.location.href = '/login';
            }
        });

        return () => unsubscribe();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleConfirmEdit = async () => {
        if (ticket) {
            await setDoc(doc(db, 'tickets', ticket.id), {
                userId: user?.uid,
                title,
                description,
                timestamp: ticket.timestamp,
            });
            setIsEditing(false);
        }
    };
    const handleCancelEdit = () => {
        if (ticket) {
            setTitle(ticket.title);
            setDescription(ticket.description);
            setIsEditing(false);
        }
    };

    const handleDeleteTicket = async () => {
        if (ticket) {
            await deleteDoc(doc(db, 'tickets', ticket.id));
            setTicket(null);
            setComments([]);
            setTitle('');
            setDescription('');
        }
    };

    const handleEditComment = (commentId: string, content: string) => {
        setEditingCommentId(commentId);
        setEditedCommentContent(content);
    };

    const handleConfirmEditComment = async (commentId: string) => {
        const commentDocRef = doc(db, 'tickets', ticket?.id!, 'comments', commentId);
        await setDoc(commentDocRef, { content: editedCommentContent }, { merge: true });

        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === commentId ? { ...comment, content: editedCommentContent } : comment
            )
        );
        setEditingCommentId(null);
    };

    const handleCancelEditComment = () => {
        setEditingCommentId(null);
        setEditedCommentContent('');
    };

    const handleDeleteComment = async (commentId: string) => {
        const commentDocRef = doc(db, 'tickets', ticket?.id!, 'comments', commentId);
        await deleteDoc(commentDocRef);

        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    };

    const handleAddComment = async () => {
        if (ticket && newComment) {
            const commentRef = await addDoc(collection(db, 'tickets', ticket.id, 'comments'), {
                userId: user?.uid,
                content: newComment,
                timestamp: new Date(),
                isAdminResponse: user?.email === 'nolanetaft@gmail.com', // Check if the comment is from an admin
            });
            setComments([...comments, { id: commentRef.id, content: newComment, userId: user?.uid, timestamp: new Date(), isAdminResponse: user?.email === 'nolanetaft@gmail.com' }]);
            setNewComment('');
        }
    };

    const handleCreateTicket = async () => {
        if (title && description) {
            const ticketRef = await addDoc(collection(db, 'tickets'), {
                userId: user?.uid,
                title,
                description,
                timestamp: new Date(),
            });
            setTicket({
                id: ticketRef.id,
                title,
                description,
                timestamp: new Date(),
            });
            setTitle(title);
            setDescription(description);
        }
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
            <div className="max-w-2xl mx-auto p-8 rounded-lg shadow-lg bg-white text-black border border-black mt-10">
                {!ticket ? (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Create a New Ticket</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-3 border rounded-lg bg-gray-100 border-black text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out w-full mb-4"
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="p-3 border rounded-lg bg-gray-100 border-black text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out w-full mb-4"
                        />
                        <button onClick={handleCreateTicket} className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-200 ease-in-out">
                            Create Ticket
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Your Project Requests</h2>
                        <div className="relative bg-gray-100 border border-black rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="p-3 border rounded-lg bg-gray-200 border-black text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out w-full mb-4"
                                        readOnly={!isEditing} // Make it read-only unless editing
                                        style={{ userSelect: isEditing ? 'auto' : 'none' }} // Prevent selection unless editing
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="p-3 border rounded-lg bg-gray-200 border-black text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out w-full mb-4"
                                        readOnly={!isEditing} // Make it read-only unless editing
                                        style={{ userSelect: isEditing ? 'auto' : 'none' }} // Prevent selection unless editing
                                    />
                                </div>
                                <Menu as="div" className="ml-4"> {/* Add margin to the left to create space between the menu and the text fields */}
                                    <Menu.Button>
                                        <DotsVerticalIcon className="w-6 h-6 text-gray-600" />
                                    </Menu.Button>
                                    <Transition
                                        as={React.Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-black rounded-md shadow-lg">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={handleEditClick}
                                                        className={`${active ? 'bg-gray-200' : ''} group flex items-center w-full px-4 py-2 text-sm text-black`}
                                                    >
                                                        <PencilIcon className="w-5 h-5 mr-2" />
                                                        Edit Ticket
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={handleDeleteTicket}
                                                        className={`${active ? 'bg-gray-200' : ''} group flex items-center w-full px-4 py-2 text-sm text-black`}
                                                    >
                                                        <TrashIcon className="w-5 h-5 mr-2" />
                                                        Delete Ticket
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>

                            {/* Confirm/Cancel buttons for editing */}
                            {isEditing && (
                                <div className="flex justify-end space-x-2 mt-4">
                                    <button onClick={handleConfirmEdit} className="flex items-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-200 ease-in-out">
                                        <CheckIcon className="w-5 h-5 mr-2" />
                                        Confirm
                                    </button>
                                    <button onClick={handleCancelEdit} className="flex items-center bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-200 ease-in-out">
                                        <XIcon className="w-5 h-5 mr-2" />
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-4">Comments</h3>
                        <ul className="space-y-2">
                            {comments.map((comment) => (
                                <li key={comment.id} className={`p-3 border border-black rounded-lg my-2 relative ${comment.isAdminResponse ? 'bg-blue-100' : 'bg-gray-200'}`}>
                                    {editingCommentId === comment.id ? (
                                        <>
                                            <textarea
                                                value={editedCommentContent}
                                                onChange={(e) => setEditedCommentContent(e.target.value)}
                                                className="p-2 border rounded-lg bg-gray-100 border-black my-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out w-full mb-2"
                                            />
                                            <div className="flex justify-end space-x-2">
                                                <button onClick={() => handleConfirmEditComment(comment.id)} className="flex items-center bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-700 transition-all duration-200 ease-in-out">
                                                    <CheckIcon className="w-4 h-4 mr-1" />
                                                    Confirm
                                                </button>
                                                <button onClick={handleCancelEditComment} className="flex items-center bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition-all duration-200 ease-in-out">
                                                    <XIcon className="w-4 h-4 mr-1" />
                                                    Cancel
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <p>{comment.content}</p>
                                            {comment.isAdminResponse && (
                                                <p className="text-sm text-gray-500 italic">Elevate Response</p>
                                            )}
                                            {!comment.isAdminResponse && (
                                                <Menu as="div" className="absolute top-2 right-4"> {/* Adjusted position for more space */}
                                                    <Menu.Button>
                                                        <DotsVerticalIcon className="w-5 h-5 my-2 text-gray-600" />
                                                    </Menu.Button>
                                                    <Transition
                                                        as={React.Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute right-0 w-36 z-10 bg-white border border-black rounded-md shadow-lg">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        onClick={() => handleEditComment(comment.id, comment.content)}
                                                                        className={`${active ? 'bg-gray-200' : ''} group flex items-center w-full px-3 py-1 text-sm text-black`}
                                                                    >
                                                                        <PencilIcon className="w-4 h-4 mr-2" />
                                                                        Edit
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        onClick={() => handleDeleteComment(comment.id)}
                                                                        className={`${active ? 'bg-gray-200' : ''} group flex items-center w-full px-3 py-1 text-sm text-black`}
                                                                    >
                                                                        <TrashIcon className="w-4 h-4 mr-2" />
                                                                        Delete
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
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
                            className="p-3 border rounded-lg my-2 bg-gray-100 border-black text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ease-in-out w-full" />
                        <button onClick={handleAddComment} className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-200 ease-in-out mt-4">
                            Add Comment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
