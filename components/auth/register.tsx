"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import {addToast} from "@heroui/react";

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

const schema = yup.object({
  username: yup
    .string()
    .required("Введіть ім'я користувача")
    .min(3, "Ім'я повинно містити мінімум 3 символи"),
  email: yup
    .string()
    .required('Введіть email для реєстрації')
    .email(),
  password: yup
    .string()
    .required("Введіть пароль")
    .min(6, "Пароль повинен містити мінімум 6 символів"),
})

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  })

  async function registration(form: RegisterForm) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        addToast({title: data.success})
      } else {
        addToast({title: data.error})
      }

      return data.data;
    } catch(e) {
      console.log(e)
    }
  }

  const onSubmit = async (data: RegisterForm) => {
    registration(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-4 flex flex-col gap-4"
    >
      <div>
        <label className="block mb-1 font-medium">Ім&apos;я користувача</label>
        <input
          type="text"
          {...register("username")}
          className="w-full border rounded px-3 py-2"
          placeholder="Введіте ваше ім'я"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Пошта</label>
        <input
          type="text"
          {...register("email")}
          className="w-full border rounded px-3 py-2"
          placeholder="Введіте ваше ім'я"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Пароль</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border rounded px-3 py-2"
          placeholder="Введите пароль"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-orange-500 text-white rounded py-2 hover:bg-orange-600"
      >
        {isSubmitting ? "Реєстрація..." : "Зареєструватися"}
      </button>
    </form>
  )
}
