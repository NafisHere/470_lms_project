import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const categories = [
  // { id: "nextjs", label: "Next JS" },
  // { id: "data science", label: "Data Science" },
  // { id: "frontend development", label: "Frontend Development" },
  // { id: "fullstack development", label: "Fullstack Development" },
  // { id: "mern stack development", label: "MERN Stack Development" },
  // { id: "backend development", label: "Backend Development" },
  // { id: "javascript", label: "Javascript" },
  // { id: "python", label: "Python" },
  // { id: "docker", label: "Docker" },
  // { id: "mongodb", label: "MongoDB" },
  // { id: "html", label: "HTML" },
  { id: "hatha_yoga", label: "Hatha Yoga" },
  { id: "vinyasa_flow", label: "Vinyasa Flow" },
  { id: "ashtanga_yoga", label: "Ashtanga Yoga" },
  { id: "yin_yoga", label: "Yin Yoga" },
  { id: "restorative_yoga", label: "Restorative Yoga" },
  { id: "prenatal_yoga", label: "Prenatal Yoga" },
  { id: "kundalini_yoga", label: "Kundalini Yoga" },
  { id: "meditation", label: "Meditation" },
  { id: "pranayama", label: "Pranayama" },
  { id: "yoga_therapy", label: "Yoga Therapy" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

        handleFilterChange(newCategories, sortByPrice);
        return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  }
  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      <div>
        <h1 className="font-semibold mb-2">CATEGORY</h1>
        {categories.map((category) => (
          <div className="flex items-center space-x-2 my-2">
            <Checkbox
              id={category.id}
              onCheckedChange={() => handleCategoryChange(category.id)}
            />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
