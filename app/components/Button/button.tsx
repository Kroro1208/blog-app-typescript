export default function Button({ text, onClick }: { text: string, onClick: () => void; }) {
    return (
        <button
            className="bg-primary py-3 px-4 rounded-full text-base font-medium text-white transition duration-300 ease-out hover:bg-opacity-80 hover:shadow-signUp"
            onClick={onClick}
        >
            {text}
        </button>
    )
}