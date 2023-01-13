import { useState, Fragment } from "react";
import { Combobox } from "@headlessui/react";

export default function MyCombobox({ movies }: any) {
  const [selectedPerson, setSelectedPerson] = useState(movies[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? movies
      : movies.filter((movie: any) => {
          return movie.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(person) => "hello"}
      />
      <Combobox.Options>
        {filteredPeople.map((movie: any) => (
          /* Use the `active` state to conditionally style the active option. */
          /* Use the `selected` state to conditionally style the selected option. */
          <Combobox.Option key={movie.id} value={movie} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={`${
                  active ? "bg-blue-500 text-white" : "bg-white text-black"
                }`}
              >
                {selected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
                {movie.name}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
