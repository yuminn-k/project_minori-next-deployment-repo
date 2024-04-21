'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useSearchParams} from 'next/navigation';
import postCreateClassPost from '@/src/api/classBoard/postCreateClassPost';
import {ClassPostCreateProps} from '@/src/interfaces/_class/modal';
import User from '@/src/model/User';
import icons from '@/public/svgs/_class';

const ClassCreatePost = ({setShowPostModal}: ClassPostCreateProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [isAnnounced, setIsAnnounced] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const searchParams = useSearchParams();
  const cid = Number(searchParams.get('id'));
  const uid = User.uid;
  const createData = {
    title,
    content,
    cid,
    uid,
    isAnnounced,
    image: image || undefined,
  };

  const handleClose = () => {
    setShowPostModal(false);
  };

  const handleCreate = async () => {
    try {
      const response = await postCreateClassPost({
        ...createData,
        is_announced: createData.isAnnounced,
      });
      console.log(response);
      alert('Post created successfully');
      setShowPostModal(false);
    } catch (error) {
      alert('Failed to create post');
      console.error(error);
    }
  };

  const handleCheckAnnounced = () => {
    setIsAnnounced(!isAnnounced);
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setImage(e.dataTransfer.files[0]);
      setPreview(URL.createObjectURL(e.dataTransfer.files[0]));
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div id="postCreate" className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        <span
          className="hidden sm:inline-block align-middle h-screen"
          aria-hidden="true"
        />
        <div className="inline-block align-bottom bg-white text-left shadow-xl transform transition-all my-8 sm:align-middle w-2/5">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-3xl leading-6 font-bold text-gray-900">
                  Create Class Post
                </h3>
              </div>
              <div className="mt-4">
                <div className="flex justify-center">
                  <input
                    id="title"
                    type="text"
                    className="border-b border-slate-400 text-center text-3xl py-2"
                    placeholder="Post Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-center mt-6">
                  <p className="text-xl font-semibold me-2">Announce Post</p>
                  <input type="checkbox" onChange={handleCheckAnnounced} />
                </div>
                <div className="mt-6">
                  <div
                    onDragEnter={handleDragIn}
                    onDragLeave={handleDragOut}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-dotted h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center ${
                      dragging ? 'bg-red-200' : ''
                    }`}
                  >
                    <div className="absolute">
                      <div className="flex flex-col items-center">
                        {image ? (
                          <Image
                            src={preview || icons.thumbnail}
                            alt={'thumbnail'}
                            width={200}
                            height={200}
                            className="w-auto h-auto max-w-52 max-h-40 mt-4"
                          />
                        ) : (
                          <Image
                            className="opacity-30"
                            src={icons.thumbnail}
                            alt={'thumbnail'}
                            width={72}
                            height={72}
                          />
                        )}
                        <span className="block text-gray-400 font-normal mb-2">
                          Attach you files here
                        </span>
                      </div>
                    </div>
                    <input
                      type="file"
                      className="h-full w-full opacity-0"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-2 items-center">
                <textarea
                  id="content"
                  className="ps-2 pt-2 border border-gray-400 rounded h-28 w-full"
                  placeholder="Please input post content here"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleCreate}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Create
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassCreatePost;
