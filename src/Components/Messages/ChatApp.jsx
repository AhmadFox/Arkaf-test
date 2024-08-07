// Import statements (use your actual import paths)
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Tabs } from 'antd';
import { RiSendPlaneLine } from 'react-icons/ri';
import { FaLessThanEqual, FaMicrophone } from 'react-icons/fa';
import { MdOutlineAttachFile } from 'react-icons/md';
import { settingsData } from "@/store/reducer/settingsSlice";
import { deleteChatMessagesApi, getChatsListApi, getChatsMessagesApi, sendMessageApi } from '@/store/actions/campaign';
import { formatDistanceToNow } from 'date-fns';
import No_Chat from "../../../public/no_chat_found.svg";
import { placeholderImage, translate } from '@/utils';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { newchatData, removeChat } from '@/store/reducer/momentSlice';
import { userSignUpData } from '@/store/reducer/authSlice';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import toast from 'react-hot-toast';
import moment from 'moment';
import dynamic from 'next/dynamic';
import InputText from '../ui/InputText';
import Link from 'next/link';

const VerticleLayout = dynamic(() => import('../AdminLayout/VerticleLayout.jsx'), { ssr: false });
const { TabPane } = Tabs;

const ChatApp = ({ notificationData }) => {
  // Define State
  const [collapsListing, setCollapsListing] = useState(true);
  const [search, setSearch] = useState('');
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [listingDetails, setListingDetails] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Define User Auth
  const isLoggedIn = useSelector((state) => state.User_signup);
  const DummyImgData = useSelector(settingsData);
  const PlaceHolderImg = DummyImgData?.web_placeholder_logo;
  const userProfile = isLoggedIn && isLoggedIn.data ? isLoggedIn.data.data.profile : PlaceHolderImg;

  const handleSend = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'User',
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const handleKeyDownEnterMessage = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMessegeSearch = (valid, value) => {
    console.log('Search Messege:', value);
    setSearch(value);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    console.log('search value:', search);
    getChatsListApi(
      search,
      (res) => {
        setChatList(res.data);

        if (storedChatData) {
          if (!res.data.some(chat => chat.property_id === newChatData.property_id)) {
            setChatList(prevList => [newChatData, ...prevList]);
          }
          // Set the active tab key to the newChatData's property_id
        } else {
          setSelectedTab(res.data[0]);
          setActiveTabKey(res.data[0].property_id);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, [search]);

  const handleSwitchChat = (chat) => {
    console.log('Chat Selected:', chat);
    getChatsMessagesApi(
      chat.user_id,
      chat.property_id,
      currentPage,
      perPage,
      (res) => {
        const apiMessages = res.data.data || [];
        setListingDetails(res.details);
        setConversation(apiMessages);
      },
      (err) => {
        toast.error(err);
      }
    );
  };

  console.log('listingDetails', listingDetails);
  console.log('conversation', conversation);

  return (
    <div className="container">
      {chatList?.length > 0 && chatList !== "" ? (
        <div className="lg:grid grid-cols-12">
          <div className="col-span-4 border-e p-2 pt-4">
            <h3 className='text-xl md:text-2xl xl:text-3xl font-medium text-[#272835] mb-4'>{translate("messages")}</h3>
            <div className="relative">
              <InputText
                placeholder={'SearchAgentName'}
                onValueChange={handleMessegeSearch}
                type="text"
                className={'ps-10'}
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute bottom-2.5 start-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {chatList.map((chat) => (
                <li key={chat.property_id} className="border-b last:border-none pb-3">
                  <div className="flex gap-3 items-center rounded-lg bg-[#F6F8FA] p-3 cursor-pointer" onClick={() => handleSwitchChat(chat)}>
                    <Image 
                      loading="lazy"
                      src={chat?.profile ? chat?.profile : PlaceHolderImg}
                      alt="Chat receiver profile picture"
                      width={64}
                      height={64}
                      className='rounded-full border'
                      onError={placeholderImage}
                    />
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-lg">{chat.name}</h4>
                        <span className="text-[#5A727B] text-sm">{formatDate(chat.date)}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-8 pt-3 border-e">
            <div className="flex justify-between items-center border-b py-3 px-4">
              <div className="flex gap-3 items-center rounded-lg">
                <Image 
                  loading="lazy"
                  src={conversation[0]?.user_profile ? conversation[0]?.user_profile : PlaceHolderImg}
                  alt="Chat receiver profile picture"
                  width={64}
                  height={64}
                  className='rounded-full border'
                  onError={placeholderImage}
                />
                <div className="w-full">
                  <h4 className="text-xl mb-1">{conversation[0]?.user_name}</h4>
                  <span className="text-[#36394A] text-sm block mb-1">The Anwar Group Real Estate</span>
                </div>
              </div>
              <Link href={`/find-agents/${conversation[0]?.receiver_id}`} className='tw-btn-outline py-2 px-6 text-sm rounded'>{translate('viewProfile')}</Link>
            </div>
            <div className="overflow-y-auto min-h-[50vh] max-h-[50vh]">
              <div className="p-3 bg-white sticky top-0">
                <div className="border-lg border-[#DFE1E7] border-1 bg-[#F6F8FA] p-3 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" className='bg-white rounded-full p-2'>
                        <path d="M21 8V20.9932C21 21.5501 20.5552 22 20.0066 22H3.9934C3.44495 22 3 21.556 3 21.0082V2.9918C3 2.45531 3.4487 2 4.00221 2H14.9968L21 8ZM19 9H14V4H5V20H19V9ZM8 7H11V9H8V7ZM8 11H16V13H8V11ZM8 15H16V17H8V15Z" fill="#5A727B"/>
                      </svg>
                      {
                        listingDetails.type === 'property' ?
                        <p className="text-lg text-[#272835]">Property Listing</p>:
                        <p className="text-lg text-[#272835]">Proposal for Listing</p>
                      }
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setCollapsListing(!collapsListing)} className="border rounded-full p-2 bg-white hover:!bg-[#405861] ease-in-out duration-200 group">
                        {
                          collapsListing ? 
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 group-hover:stroke-white ease-in-out duration-200">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                          </svg> :
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 group-hover:stroke-white ease-in-out duration-200">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                          </svg>
                        }
                      </button>
                      {
                        listingDetails.type === 'property' ?
                        <Link href={`properties-details/${listingDetails.slug_id}`} className='tw-btn-outline !py-[10px] h-9 px-6 text-xs font-normal rounded bg-white hover:!bg-[#405861]'>{translate('openProperty')}</Link>:
                        <Link href={`properties-details/${listingDetails.slug_id}`} className='tw-btn-outline !py-[10px] h-9 px-6 text-xs font-normal rounded bg-white hover:!bg-[#405861]'>{translate('openListing')}</Link>
                      }
                    </div>
                  </div>
                  <div className={`overflow-hidden ${collapsListing ? 'h-auto' : 'h-0'}`}>
                    <p className="text-base mb-2 text-[#272835]">{listingDetails.address}</p>
                    <ul className="flex flex-wrap items-center gap-2 mb-2">
                      {
                        listingDetails.size &&
                        <li className="rounded-full bg-white px-2.5 py-1 border border-[#C1C7D0] flex items-center gap-1 text-sm text-[#272835]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none">
                            <path d="M9.72387 1.83333H7.33333V0.5H12V5.16667H10.6667V2.77614L7.80473 5.63807L6.86193 4.69526L9.72387 1.83333ZM0 7.83333H1.33333V10.2239L4.19526 7.36193L5.13807 8.30473L2.27614 11.1667H4.66667V12.5H0V7.83333Z" fill="#272835"/>
                          </svg>
                          {listingDetails.size} sqm
                        </li>
                      }
                      <li className="rounded-full capitalize bg-white px-2.5 py-1 border border-[#C1C7D0] flex items-center gap-1 text-sm text-[#272835]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
                          <path d="M5.99805 13.4329L9.29785 10.1331C11.1203 8.31065 11.1203 5.35587 9.29785 3.53342C7.47545 1.71097 4.52066 1.71097 2.69821 3.53342C0.875767 5.35587 0.875767 8.31065 2.69821 10.1331L5.99805 13.4329ZM5.99805 15.3185L1.75541 11.0759C-0.58774 8.73272 -0.58774 4.93376 1.75541 2.59061C4.09855 0.247465 7.89751 0.247465 10.2407 2.59061C12.5838 4.93376 12.5838 8.73272 10.2407 11.0759L5.99805 15.3185ZM5.99805 8.16659C6.73445 8.16659 7.33138 7.56965 7.33138 6.83325C7.33138 6.09687 6.73445 5.49992 5.99805 5.49992C5.26165 5.49992 4.66471 6.09687 4.66471 6.83325C4.66471 7.56965 5.26165 8.16659 5.99805 8.16659ZM5.99805 9.49992C4.52529 9.49992 3.33138 8.30599 3.33138 6.83325C3.33138 5.36049 4.52529 4.16659 5.99805 4.16659C7.47078 4.16659 8.66471 5.36049 8.66471 6.83325C8.66471 8.30599 7.47078 9.49992 5.99805 9.49992Z" fill="#272835"/>
                        </svg>
                        {listingDetails.city}
                      </li>
                      {
                        listingDetails.category  &&
                        <li className="rounded-full capitalize bg-white px-2.5 py-1 border border-[#C1C7D0] flex items-center gap-1 text-sm text-[#272835]">
                          {listingDetails.category.category}
                        </li>
                      }
                    </ul>
                    <div className="mb-3">
                      <p className="text-[#272835] text-sm mb-2">{listingDetails.description}</p>
                      <span className="text-[#272835] opacity-40">12:00</span>
                    </div>
                  </div>
                  {
                    listingDetails.type !== 'property' &&
                    <div className="flex item-center gap-3">
                      <button className="tw-btn-outline py-2 px-6 text-sm rounded w-28 bg-white hover:!bg-[#405861]">{translate('decline')}</button>
                      <button className="tw-btn-solid py-2 px-6 text-sm rounded w-28">{translate('accept')}</button>
                    </div>
                  }
                </div>
              </div>
              <div className="p-3 pb-0 conversation-container flex-grow overflow-auto">
                {conversation.map((message) => (
                  <div key={message.id} className="flex items-start mb-4 gap-3">
                    <img src={message.user_profile || "https://via.placeholder.com/40"} alt="User" className="w-10 h-10 rounded-full ms-3" />
                    <div className='flex flex-col gap-1'>
                      <span className="text-lg mb-1">{message.user_name}</span>
                      <p className="textsm text-[#272835]">{message.message}</p>
                      <span className="text-xs text-[#272835] text-opacity-40">{new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <div className="px-3 py-2 border-t mt-4">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={handleKeyDownEnterMessage}
                  className="border-0 w-full !outline-none p-0 resize-none !ring-0"
                  rows="2"
                ></textarea>
              </div>
              <div className="border-t p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="border rounded-full p-2.5 hover:bg-[#405861] ease-in-out duration-200 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                      <path
                        d="M10.3566 5.46448L5.64251 10.1785C5.31707 10.5039 5.31707 11.0316 5.64251 11.357C5.96795 11.6825 6.4956 11.6825 6.82101 11.357L11.5351 6.64299C12.5113 5.66668 12.5113 4.08377 11.5351 3.10745C10.5588 2.13114 8.97585 2.13114 7.99952 3.10745L3.28549 7.8215C1.65831 9.44867 1.65831 12.0868 3.28549 13.7141C4.91267 15.3413 7.55085 15.3413 9.17801 13.7141L13.8921 9L15.0706 10.1785L10.3566 14.8926C8.07851 17.1706 4.38504 17.1706 2.10698 14.8926C-0.171077 12.6145 -0.171077 8.92109 2.10698 6.64299L6.82101 1.92894C8.44818 0.301761 11.0864 0.301761 12.7136 1.92894C14.3408 3.55613 14.3408 6.19431 12.7136 7.8215L7.99952 12.5356C7.02326 13.5118 5.44031 13.5118 4.46401 12.5356C3.48769 11.5593 3.48769 9.97634 4.46401 9L9.17801 4.28597L10.3566 5.46448Z"
                        fill="#272835" className="group-hover:fill-white ease-in-out duration-200" />
                    </svg>
                  </button>
                  <button className="border rounded-full p-2.5 hover:bg-[#405861] ease-in-out duration-200 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M5.83333 3.33329V1.66663H14.1667V3.33329H16.6722C17.1293 3.33329 17.5 3.70408 17.5 4.16113V17.5055C17.5 17.9626 17.1292 18.3333 16.6722 18.3333H3.32783C2.87063 18.3333 2.5 17.9625 2.5 17.5055V4.16113C2.5 3.70393 2.87079 3.33329 3.32783 3.33329H5.83333ZM5.83333 4.99996H4.16667V16.6666H15.8333V4.99996H14.1667V6.66663H5.83333V4.99996ZM7.5 3.33329V4.99996H12.5V3.33329H7.5Z"
                        fill="#272835" className="group-hover:fill-white ease-in-out duration-200" />
                    </svg>
                  </button>
                  <button className="border rounded-full p-2.5 hover:bg-[#405861] ease-in-out duration-200 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M9.0013 17.3333C4.39893 17.3333 0.667969 13.6023 0.667969 8.99996C0.667969 4.39758 4.39893 0.666626 9.0013 0.666626C13.6036 0.666626 17.3346 4.39758 17.3346 8.99996C17.3346 13.6023 13.6036 17.3333 9.0013 17.3333ZM9.0013 15.6666C12.6832 15.6666 15.668 12.6819 15.668 8.99996C15.668 5.31806 12.6832 2.33329 9.0013 2.33329C5.3194 2.33329 2.33464 5.31806 2.33464 8.99996C2.33464 12.6819 5.3194 15.6666 9.0013 15.6666ZM4.83464 8.99996H6.5013C6.5013 10.3807 7.62055 11.5 9.0013 11.5C10.3821 11.5 11.5013 10.3807 11.5013 8.99996H13.168C13.168 11.3011 11.3025 13.1666 9.0013 13.1666C6.70012 13.1666 4.83464 11.3011 4.83464 8.99996Z"
                        fill="#272835" className="group-hover:fill-white ease-in-out duration-200" />
                    </svg>
                  </button>
                  <span className="h-8 w-[1px] bg-[#E3E8E7]"></span>
                  <button className="border rounded-full p-2.5 hover:bg-[#405861] ease-in-out duration-200 group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                      stroke="currentColor" className="size-4 group-hover:stroke-white ease-in-out duration-200">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                  </button>
                </div>
                <button className="tw-btn-solid py-2 px-6 rounded flex items-center justify-center gap-2"
                  onClick={handleSend}>
                  Send
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.75}
                    stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center py-9">
          <Image loading="lazy" src={No_Chat.src} alt="no_chats" width={450} height={450} onError={placeholderImage} className='mx-auto mb-6 xl:mb-9' />
          <h3 className='text-center text-lg md:text-xl xl:text-2xl'>{translate("noChat")}</h3>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
