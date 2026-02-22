import ButtonPage from "./button/page";
import CalendarPage from "./calendar/page";
import FileInputPage from "./file-input/page";

export default function CompoenntContent() {
  return (
    <div className="bg-white dark:bg-zinc-950 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Component Previews</h1>
      <main className="flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6 w-full max-w-full">
          <ButtonPage />
          <FileInputPage />
          <CalendarPage />
        </div>
      </main>
    </div>
  );
}
