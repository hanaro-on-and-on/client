type ToolBarDetailProps = {
  title: string;
  isSelected: boolean;
};

const ToolBarDetail = ({ title, isSelected }: ToolBarDetailProps) => {
  return (
    <div
      className={`transition-all ${isSelected ? 'font-bold text-hanaLightGreen' : ''}`}
    >
      {title}
    </div>
  );
};

export default ToolBarDetail;
