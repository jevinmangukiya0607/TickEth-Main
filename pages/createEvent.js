import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
// import Image from 'next/image';
import UploadImageIcon from 'assets/UploadImageIcon';
import PageHead from 'components/PageHead';
import { CREATE_EVENT_FIELDS, FORM_FIELDS } from 'constants/CreateEvent';
import { createOfflineEventApi, createOnlineEventApi } from 'utils/api';

const initialState = {
  title: '',
  createdBy: '',
  ticketVolume: '',
  price: '',
  eventDate: '',
  description: '',
  onlineEventUrl: '',
  shortDescription: '',
};

export default function CreateEvent() {
  const [isOnlineEventChecked, setIsOnlineEventChecked] = useState(false);
  const [state, setState] = useState(initialState);
  const [imgSrc, setImgSrc] = useState();
  const router = useRouter();

  const onChange = e => {
    const key = e.target.id;
    setState({ ...state, [key]: e.target.value });
  };

  const onChangeCheckbox = () => {
    setIsOnlineEventChecked(!isOnlineEventChecked);
  };

  const formSubmit = async e => {
    e.preventDefault();
    let data = new FormData();
    const eventId = uuidv4();
    FORM_FIELDS.forEach(item => {
      item = item.trim();
      if (item === 'eventId') {
        data.append(item, eventId);
      } else if (item === 'image') {
        data.append(item, imgSrc);
      } else if (item === 'ticketsLeft') {
        data.append(item, state.ticketVolume);
      } else {
        data.append(item, state[item]);
      }
    });
    data.append('shortDescription', state.description.slice(0, 255));
    if (isOnlineEventChecked) {
      if (!state.onlineEventUrl?.length > 0) {
        toast.error('Online Event Link is missing!');
        return;
      }
      data.append('url', state.onlineEventUrl);
    }

    try {
      let res;
      if (isOnlineEventChecked) {
        res = await createOnlineEventApi(data);
      } else {
        res = await createOfflineEventApi(data);
      }
      console.log(res);
      if (res.status === 200) {
        toast.success('Event Created Successfully');
        router.push(`/browse/${eventId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eventImgUpload = e => {
    let file = e.target.files[0];
    const url = URL.createObjectURL(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log('Url', url);
      setImgSrc(file);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  return (
    <>
      <PageHead
        title="Create Your Event | TickEth"
        description="Revolutionising the ticketing Industry using NFTs"
      />
      <div className="p-8 rounded-md md:p-20">
        <h1 className="text-3xl font-semibold mb-5">CREATE AN EVENT</h1>
        <form
          action="#"
          method="POST"
          onSubmit={formSubmit}
          encType="multipart/form-data"
        >
          <div className="drop-shadow-xl sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:space-y-0 sm:p-6 sm:grid sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CREATE_EVENT_FIELDS.map(field => (
                <div
                  className={`flex flex-col items-start ${
                    field.id === 'eventDate' ? 'sm:col-span-2' : ''
                  }`}
                  key={field.id}
                >
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-gray-700 w-full"
                  >
                    {field.name}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    value={state[field.id]}
                    className="p-2 flex-1 block w-full mt-1 sm:text-sm border-b-2 border-gray-300 focus:outline-none focus:border-rose-400"
                    placeholder={field.placeholder}
                    onChange={onChange}
                  />
                </div>
              ))}

              <div className="sm:col-span-2 lg:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 w-full"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={state.description}
                  onChange={onChange}
                  rows={3}
                  className="px-3 py-2 mt-1 block w-full sm:text-sm border-b-2 border-gray-300 resize-none focus:outline-none focus:border-rose-400"
                  placeholder="Event Description"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <input
                  className="mr-2"
                  type="checkbox"
                  id="onlineEventCheck"
                  value={isOnlineEventChecked}
                  onChange={onChangeCheckbox}
                />
                <label
                  htmlFor="onlineEventCheck"
                  className="text-sm font-medium text-gray-700 w-full"
                >
                  Online Event
                </label>
              </div>
              {isOnlineEventChecked && (
                <div className="sm:col-span-2 lg:col-span-3">
                  <label
                    htmlFor="onlineEventUrl"
                    className="block text-sm font-medium text-gray-700 w-full"
                  >
                    Online Event Link
                  </label>
                  <input
                    type="text"
                    id="onlineEventUrl"
                    value={state.onlineEventUrl}
                    className="p-2 flex-1 block w-full mt-1 sm:text-sm border-b-2 border-gray-300 focus:outline-none focus:border-rose-400"
                    placeholder="meet.google.com/abc-defg-hij"
                    onChange={onChange}
                  />
                </div>
              )}

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Event Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <UploadImageIcon
                      width="48"
                      height="48"
                      className="mx-auto text-gray-400"
                      strokeWidth="2"
                    />
                    {/* {imgSrc && (
                      <Image
                        src={imgSrc}
                        alt="Uploaded Image"
                        width={200}
                        height={200}
                      />
                    )} */}
                    <div className="flex text-sm justify-center text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-rose-500 hover:text-rose-600 focus-within:outline-none"
                      >
                        <span className="">Upload a file</span>
                        <input
                          onChange={eventImgUpload}
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-left sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-6 w-full md:w-fit border border-transparent shadow-lg text-sm font-semibold rounded-md text-white bg-red hover:opacity-80"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
}
