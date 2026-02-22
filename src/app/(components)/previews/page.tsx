import CreateSystemGroupRole from "./create-role/page";
import AutocompletePreview from "./auto-complete/page";
import ButtonPreview from "./button/page";
import InputPreview from "./input/page";
import SelectPreview from "./select/page";

export default function PreviewContent() {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-3xl font-semibold mb-10">
        Component Previews
      </h1>

      <div className="space-y-12">
        <InputPreview />
        <SelectPreview />
        <AutocompletePreview />
        <ButtonPreview />
        <CreateSystemGroupRole />
      </div>
    </div>
  );
}