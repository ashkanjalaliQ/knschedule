interface StatsItemProps {
  label?: string;
  value?: string;
}

const StatsItem = ({ label, value }: StatsItemProps) => {
  return (
    <div className="text-center hover-scale">
      <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-600 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-gray-600 dark:text-gray-200">{label}</div>
    </div>
  );
};

export default StatsItem;
