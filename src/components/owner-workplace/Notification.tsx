import { useState } from 'react';
import { HStack, VStack } from '../ui/Stack';
import { BiTrash } from 'react-icons/bi';

type NotificationProps = {
  notificationId: number;
  title: string;
  content: string;
  createdAt: Date;
};

const Notification = ({ title, content, createdAt }: NotificationProps) => {
  const [expanded, setExpanded] = useState(false);
  const created = new Date(createdAt);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <VStack className='p-4 text-start border-b border-b-gray-300 hover:bg-gray-100 last:border-b-0 first:bo'>
      <HStack className='justify-between'>
        <HStack className='items-baseline'>
          <div className='font-semibold'>{title}</div>
        </HStack>
        <button className='bg-transparent'>
          <BiTrash />
        </button>
      </HStack>
      <div className='text-gray-400 text-sm'>
        {`${created.toLocaleDateString()} ${created.toLocaleTimeString()}`}
      </div>
      <div
        className={`min-h-8 text-wrap ${expanded ? 'overflow-visible' : 'overflow-hidden h-8'}`}
      >
        {content}
        {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        condimentum justo sit amet lorem pellentesque varius. Proin ac nisl vel
        felis pharetra lobortis. Nullam efficitur eros at nulla consectetur, et
        efficitur lectus gravida. Sed vel dolor id mi sodales condimentum. Nam a
        condimentum leo. Vivamus non condimentum urna, vel aliquam nisi.
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. In volutpat vehicula nisl, ac sodales lacus
        dapibus non. Maecenas sit amet gravida est. Vestibulum ante ipsum primis
        in faucibus orci luctus et ultrices posuere cubilia curae; Integer
        semper, ligula vel tempus pulvinar, ligula nisi dictum est, vitae luctus
        quam nisi a nulla. Nullam varius rutrum dolor non fermentum. Sed sit
        amet lobortis mauris. Donec vestibulum, eros at fermentum ultrices,
        lectus ligula venenatis purus, at vehicula mi magna non nunc. Duis
        viverra, ligula at tincidunt efficitur, orci mauris semper justo, id
        vehicula ligula felis ac lorem. Ut euismod interdum est, id posuere elit
        sollicitudin et. Duis id arcu odio. Nam ut massa id neque euismod
        pretium. Duis ac mi id purus bibendum accumsan. */}
      </div>
      <button
        className='self-end px-2 py-1 underline bg-transparent text-sm text-gray-500'
        onClick={toggleExpand}
      >
        {expanded ? '접기' : '더 보기'}
      </button>
    </VStack>
  );
};
export default Notification;
