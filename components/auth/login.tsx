"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { addToast } from "@heroui/toast"

interface LoginForm {
  username: string
  password: string
}

const schema = yup.object({
  username: yup
    .string()
    .required("Введите имя пользователя")
    .min(3, "Имя должно содержать минимум 3 символа"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(6, "Пароль должен содержать минимум 6 символов"),
})

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })

  async function login(form: LoginForm) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password
        })
      });

      const data = await res.json();
      console.log(data)
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

  const onSubmit = async (data: LoginForm) => {
    login(data)
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
        {isSubmitting ? "Вход..." : "Войти"}
      </button>
    </form>
  )
}
