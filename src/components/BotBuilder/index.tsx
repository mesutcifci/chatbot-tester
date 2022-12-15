import { data } from "./inputConstants";

const BotBuilder = () => {
  const renderInputs = () => {
    return data.map((item) => (
      <div
        key={item.inputId}
        className={`flex flex-col  justify-center gap-y-2 w-full max-w-[400px] ${item.inputContainerStyles}`}
      >
        <label
          htmlFor={item.inputId}
          className={`cursor-pointer text-[#606060] font-bold hover:text-[#606060a0] ${item.labelStyles}`}
        >
          {item.labelText}
        </label>
        <input
          name={item.inputId}
          id={item.inputId}
          type={item.inputType}
          placeholder={item.placeholderText}
          className={`border border-[#383838] border-solid p-2 w-full rounded-md focus:border-indigo-500 focus:ring-indigo-500  ${item.inputStyles}`}
        />
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-y-6 w-full items-center p-5">
      {renderInputs()}
    </div>
  );
};

export default BotBuilder;
