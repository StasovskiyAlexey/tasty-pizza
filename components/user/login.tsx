"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { LoginForm, useAuthContext } from "@/providers/auth-provider"

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
  const {login} = useAuthContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: LoginForm) => {
    login(data)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto mt-4 flex flex-col gap-4"
    >
      <div>
        <span className="block mb-1 font-medium">Ім&apos;я користувача</span>
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
        <span className="block mb-1 font-medium">Пароль</span>
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
        <span>{isSubmitting ? "Виконується вхід..." : "Вхід"}</span>
      </button>
    </form>
  )
}
