"use client";

import {AutocompleteMulti} from "@/dev/auto-complete/multi";
import {AutocompleteSingle, AutoOption } from "@/dev/auto-complete/single";
import { useState } from "react";



export default function AutocompletePreview() {
  const countryOptions = [
    { label: 'Cambodia', value: 'KH' },
    { label: 'Thailand', value: 'TH' },
    { label: 'Vietnam', value: 'VN' },
  ];

  const tagOptions = [
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Fullstack', value: 'fullstack' },
    { label: 'DevOps', value: 'devops' },
  ];

  const [selectedCountry, setSelectedCountry] = useState<AutoOption | null>(null);
  const [selectedTags, setSelectedTags] = useState<AutoOption[]>([]);
  return (
    <div className="p-8 space-y-4 w-full rounded-lg">
      <h1 className="text-2xl font-bold">Autocomplete Component</h1>
      <div className="space-y-6 p-6 rounded-lg">
        <div className="space-y-6">
          <div>
              <AutocompleteSingle
                options={countryOptions}
                value={selectedCountry}
                onChange={setSelectedCountry}
                placeholder="Select a country"
                label="Autocomplete Single Select:"
              />
          </div>
          <div>
              <AutocompleteMulti
                options={tagOptions}
                value={selectedTags}
                onChange={setSelectedTags}
                placeholder="Choose tags"
                label="Autocomplete Multi Select:"
              />
          </div>
        </div>
      </div>
    </div>
  );
}
