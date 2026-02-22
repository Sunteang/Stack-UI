"use client";

import { PasswordIcon, UserIcon } from "@/dev/icon/icon";
import { Input } from "@/dev/input/input";
import { useState } from "react";

export default function InputPreview() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");

  return (
    <div className="p-8 space-y-4 w-full rounded-lg">
      <h1 className="text-2xl font-bold">Input Component</h1>
      <div className="flex flex-col gap-4 w-full">
        <Input
          className="w-full"
          type="text"
          placeholder="Enter your name"
          value={name}
          label="Your Name:"
          defaultValue=""
          size="lg"
          color="secondary"
          variant="bordered"
          radius="md"
          labelPlacement="outside"
          isDisabled={false}
          isReadOnly={false}
          isIconLeft={<UserIcon />}
          isRequired={false}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          label="Your Email:"
          defaultValue=""
          size="md"
          color="secondary"
          variant="bordered"
          radius="md"
          labelPlacement="outside"
          isDisabled={false}
          isReadOnly={false}
          isIconLeft={true}
          isRequired={false}
          className="max-w-full"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          label="Your Password:"
          defaultValue=""
          size="lg"
          color="secondary"
          variant="bordered"
          radius="md"
          labelPlacement="outside"
          isDisabled={false}
          isReadOnly={false}
          isIconLeft={<PasswordIcon />}
          isRequired={false}
          className="max-w-full"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Enter a number"
          value={number}
          label="Number:"
          defaultValue=""
          size="md"
          color="secondary"
          variant="bordered"
          radius="md"
          labelPlacement="outside"
          isDisabled={false}
          isReadOnly={false}
          isIconLeft={true}
          isRequired={false}
          className="max-w-full"
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <div className="text-sm text-gray-600 space-y-1 pt-2">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Password: {password}</p>
        <p>Number: {number}</p>
      </div>
    </div>
  );
}
