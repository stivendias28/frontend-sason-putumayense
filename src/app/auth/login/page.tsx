"use client"
import { Input, Label, Button, A, Errors } from "@/components/auth";
import { loginUserController } from "@/controllers/loginUserController";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdRestaurant } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import Loading from "@/components/loading";
import Link from "next/link";

export default function Example() {
  const [errorsForm, setErrorsForm] = useState<any | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { data: session, status } = useSession();

  const router = useRouter();


  const onSubmit = handleSubmit(async (data: any) => {
    const response = await loginUserController(data)
    //ignorar el error
    if(response &&'status' in response && response.status === 200){
      router.push("/")
      router.refresh()
    }
  })

  if(status === 'loading') return <div className="mt-6"><Loading /></div>
  if(status === 'authenticated')  router.push("/")


  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-50 dark:bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <div className="mx-auto h-auto w-auto flex items-center justify-center flex-col select-none">
            <IoMdRestaurant className="h-16 w-auto text-gray-700 dark:text-slate-50 mb-2.5" />
            <span className="text-sm font-mono text-gray-700 dark:text-slate-50">Sason</span>
            <span className="text-sm font-mono text-gray-700 dark:text-slate-50">Putumayense</span>
          </div>

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-slate-50">
            Sign in to your account
          </h2>

        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" method="POST" onSubmit={onSubmit}>
            <div>
              <Label
                htmlFor="username"
              >
                Username
              </Label>
              <div className="mt-2">
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  {...register("username",
                  { required: true })}
                  required
                />
              </div>
              <span>
                {errors.username && <Errors>Username is required</Errors>}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                >
                  Password
                </Label>
                {/*<div className="text-sm">
                  <A href="#">
                    Forgot password?
                  </A>
                </div>*/}
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...register("password", { required: true })}
                  autoComplete="current-password"
                  required
                />
              </div>
              <span>
                {errors.password && <Errors>Password is required</Errors>}
              </span>
            </div>

            <div>
              <Button
                type="submit"
              >
                Sign in
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link
              href="/auth/register"
            >
              sign up here
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
