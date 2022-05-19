export default function ButtonWithLoader({ isLoading, onClick, text }) {
  return (
    <button
      className="p-2.5 rounded-2xl border-0 text-white w-full cursor-pointer bg-red hover:opacity-90 flex items-center justify-center"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="animate-spin h-6 w-6 rounded-full border-4 border-white border-y-red" />
      ) : (
        text
      )}
    </button>
  );
}
