import { Button } from '@/dev/button/button';

export default function ButtonPage() {
  return (
    <div className="w-full max-w-full p-4 sm:p-6 lg:p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Button Variants</h1>
      <div className="flex flex-wrap gap-2 w-full">
        <Button className="w-fit">Default</Button>
        <Button variant="outline" className="w-fit">Outline</Button>
        <Button variant="secondary" className="w-fit">Secondary</Button>
        <Button variant="success" className="w-fit">Success</Button>
        <Button variant="warning" className="w-fit">Warning</Button>
        <Button variant="danger" className="w-fit">Danger</Button>
        <Button variant="dark" className="w-fit">Dark</Button>
        <Button variant="info" className="w-fit">Info</Button>
        <Button variant="transparent" className="w-fit text-black">Transparent</Button>
      </div>
    </div>
  );
}
