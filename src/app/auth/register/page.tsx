"use client";
import { Input, Label, Required, File, Button, Errors, Date, Selector } from "@/components/auth";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getQuestionController } from "@/controllers/questionController";
import { IdentificationType, Questions } from "@/interfaces/database";
import { getGenderController } from "@/controllers/genderController";
import { getIdentificationTypeController } from "@/controllers/indentificationTypeController";
import { createUserAccountController } from "@/controllers/registerUserController";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import { useSession } from 'next-auth/react';

export default function Example() {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<String | null>(null);
    const [question, setQuestion] = useState<Questions[]>([]);
    const [gender, setGender] = useState<any[]>([]);
    const [identificationType, setIdentificationType] = useState<IdentificationType[]>([]);
    const [errorsForm, setErrorsForm] = useState<any | null>(null);

    const { register, handleSubmit, formState: { errors }, control, setValue, watch } = useForm();
    const { data: session, status } = useSession();

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
    
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setValue("photo", [file]);
        }
    };
    
    async function getQuestion() {
        const response = await getQuestionController();
        setQuestion(response);
    }

    async function getGender() {
        const response = await getGenderController();
        setGender(response);
    }

    async function getIdentificationType() {
        const response = await getIdentificationTypeController();
        setIdentificationType(response);
    }

    useEffect(() => {
        getQuestion();
        getGender();
        getIdentificationType();
    }, [])

    const onSubmit = handleSubmit(async (data) => {
        const response = await createUserAccountController(data)
        if(response &&'status' in response && response.status === 200){
            router.push("/")
            router.refresh()
        }
    })

    if(status === 'loading') return <div className="mt-6"><Loading /></div>
    if(status === 'authenticated')  router.push("/")
    
    return (
        <form 
            className="flex min-h-full flex-1 flex-col justify-center py-8 bg-slate-50 dark:bg-gray-900"
            onSubmit={onSubmit} 
            encType="multipart/form-data"
        >
            <div className="md:mx-auto sm:w-full px-2 md:px-4 md:max-w-md lg:max-w-lg xl:max-w-4xl xxl:max-w-3xl space-y-12">
                <div className="border-b border-gray-900/10 dark:border-slate-50/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-slate-50">
                        Personal Information and account
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mails.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 sm:gap-y-8 gap-y-4 sm:grid-cols-6">

                        <div className="col-span-full">
                            <Label htmlFor="photo">
                                Photo
                            </Label>
                            <div className="mt-2 flex items-center flex-col md:flex-row justify-center gap-x-3">
                                {selectedImage ? (
                                    <img src={selectedImage.toString()} id="photo" alt="Selected" className="h-20 w-20 rounded-full mb-3" />
                                ) : (
                                    <FaUserCircle className="h-20 w-auto text-gray-300 mb-3" aria-hidden="true" />
                                )}
                                <File
                                    id="photo"
                                    {...register("photo")}
                                    onChange={handleImageChange} 
                                />
                            </div>
                            <span className="text-xs text-gray-500 flex justify-center items-center">JPG, PNG, GIF</span>
                        </div>

                        {/* First name */}
                        <div className="sm:col-span-3">
                            <Label htmlFor="firstName">
                                First name <Required />
                            </Label>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    id="firstName"
                                    autoComplete="given-name"
                                    {...register("firstName", { 
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Must be at least 3 characters"
                                        } 
                                    })}
                                />
                            </div>
                            <span>
                                {errors.firstName
                                    && errors.firstName.type === "required"
                                    && <Errors>This field is required</Errors>
                                }
                                {errors.firstName
                                    && errors.firstName.type === "minLength"
                                    && <Errors>Must be at least 3 characters</Errors>
                                }
                            </span>
                            
                        </div>

                        {/* Second name */}
                        <div className="sm:col-span-3">
                            <Label htmlFor="second-name">
                                Second name
                            </Label>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    id="second-name"
                                    autoComplete="family-name"
                                    {...register("secondName", {
                                        required: false 
                                    })}
                                />
                            </div>
                        </div>

                        {/* First last name */}
                        <div className="sm:col-span-3">
                            <Label htmlFor="first-last-name">
                                First last name <Required />
                            </Label>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    id="first-last-name"
                                    autoComplete="given-name"
                                    {...register("firstLastName", {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Must be at least 3 characters"
                                        }
                                    })}
                                />
                            </div>
                            <span>
                                {errors.firstLastName
                                    && errors.firstLastName.type === "required"
                                    && <Errors>This field is required</Errors>
                                }
                                {errors.firstLastName
                                    && errors.firstLastName.type === "minLength"
                                    && <Errors>Must be at least 3 characters</Errors>
                                }
                            </span>
                        </div>

                        {/* Second last name */}
                        <div className="sm:col-span-3">
                            <Label htmlFor="second-last-name">
                                Second last name
                            </Label>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    id="second-last-name"
                                    autoComplete="given-name"
                                    {...register("secondLastName", {
                                        required: false
                                    })}
                                />
                            </div>
                        </div>

                        {/* Type and indentification number */}
                        <div className="sm:col-span-2">
                            <Label htmlFor="identificationType">
                                Id type <Required />
                            </Label>
                            <div className="mt-2">
                                <Selector
                                    id="identificationType"
                                    placeholder="Select one option"
                                    data={identificationType.map((identificationType) => ({
                                        value: identificationType.id,
                                        label: `${identificationType.nameIdentificationType} (${identificationType.abrevIdentificationType}) `
                                    }))}
                                    {...register("identificationType", {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        }
                                    })}
                                    setValue={setValue}
                                    isSearch={false}
                            />
                            </div>
                            <span>
                                {errors.identificationType
                                    && errors.identificationType.type === "required"
                                    && <Errors>This field is required</Errors>
                                }
                            </span>  
                        </div>

                        <div className="sm:col-span-4">
                            <Label className="identificationNumber">
                                identification number <Required />
                            </Label>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    id="identificationNumber"
                                    autoComplete="off"
                                    {...register("identificationNumber", {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                    })}
                                />
                            </div>
                            <span>
                                {errors.identificationNumber
                                    && errors.identificationNumber.type === "required"
                                    && <Errors>This field is required</Errors>
                                }
                            </span>
                        </div>

                        {/* Phone */}
                        <div className="sm:col-span-3">
                            <Label htmlFor="phone">
                                Phone <Required />
                            </Label>
                            <div className="mt-2">
                                <Input
                                    type="number"
                                    id="phone"
                                    autoComplete="tel"
                                    {...register("phone", {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: "Must be only numbers"
                                        }
                                    })}
                                />
                            </div>
                            <span>
                                {errors.phone
                                    && errors.phone.type === "required"
                                    && <Errors>This field is required</Errors>
                                }
                                {errors.phone
                                    && errors.phone.type === "pattern"
                                    && <Errors>Must be only numbers</Errors>
                                }
                            </span>
                        </div>

                        {/* Gender */}
                        <div className="sm:col-span-3">
                            <Label htmlFor="gender">
                                Gender <Required />
                            </Label>
                            <div className="mt-2">
                                <Selector
                                    id="gender"
                                    placeholder="Select one option"
                                    data={gender.map((gender) => ({
                                        value: gender.id,
                                        label: `${gender.nameGender} (${gender.abrevGender}) `
                                    }))}
                                    {...register("gender", {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        }
                                    })}
                                    setValue={setValue}
                                    isSearch={false}
                                />
                            </div>
                            <span>
                                {errors.gender
                                    && errors.gender.type === "required"
                                    && <Errors>This field is required</Errors>
                                }
                            </span>
                        </div>
                        
                        {/* Email */}
                        <div className="sm:col-span-full">
                            <Label htmlFor="email">
                                Email address <Required />
                            </Label>
                            <div className="mt-2">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@example.com"
                                    autoComplete="email"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Must be a valid email address"
                                        }
                                    })}
                                />
                            </div>
                            <span>
                                {errors.email
                                    && errors.email.type === "required"
                                    && <Errors>This field is required</Errors>
                                }
                                {errors.email
                                    && errors.email.type === "pattern"
                                    && <Errors>Must be a valid email address</Errors>
                                } 
                            </span>
                        </div>

                        <div className="sm:col-span-full">
                            <Label htmlFor="username">
                                Username <Required />
                            </Label>
                            <div className="mt-2">
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="username"
                                    autoComplete="username"
                                    {...register("username", {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                    })}
                                />
                            </div>
                            <span>
                                {errors.username
                                    && errors.username.type === "required"
                                    && <Errors>This field is required</Errors>
                                }
                            </span>
                        </div>

                        {/* Password */}
                        <div className="sm:col-span-3">
                            <Label htmlFor="password">
                                Password <Required />
                            </Label>
                            <div className="mt-2">
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    autoComplete="current-password"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*[^a-zA-Z\d\W_])[\w\W]{8,16}$/,
                                            message: "Password must be 8-16 characters long, with at least one lowercase letter, one uppercase letter, one number, and one special character."
                                        }
                                    })}
                                />
                            </div>
                            <span>
                                {errors.password
                                    && errors.password.type === "required"
                                    && <Errors>This field is required</Errors>
                                }
                                {errors.password
                                    && errors.password.type === "pattern"
                                    && <Errors>Password must be 8-16 characters long, with at least one lowercase letter, one uppercase letter, one number, and one special character.</Errors>
                                }
                            </span>
                        </div>

                        <div className="sm:col-span-3">
                            <Label htmlFor="confirmPassword">
                                Confirm Password <Required />
                            </Label>
                            <div className="mt-2">
                                <Input
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                    placeholder="********"
                                    {...register("confirmPassword", {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        },
                                        validate: value => value === password || "Passwords do not match"
                                    })}
                                />
                            </div>
                            <span>
                                {errors.confirmPassword
                                    && errors.confirmPassword.type === "required"
                                    && <Errors>This field is required</Errors>
                                }
                                {errors.confirmPassword
                                    && errors.confirmPassword.type === "validate"
                                    && <Errors>Passwords do not match</Errors>
                                }
                            </span>
                                    
                                    
                        </div>

                        
                    </div>
                </div>

                <div className="border-b border-gray-900/10 dark:border-slate-50/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-slate-50">
                        Safety information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Remember to select information that you do not forget, because it will be used for security issues.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 sm:gap-y-8 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <Label htmlFor="firstQuestion">
                                First question <Required />
                            </Label>
                            <div className="mt-2">
                                <Selector
                                    id="firstQuestion"
                                    placeholder="Select question..."
                                    data={question.map((question: Questions) => ({
                                        value: question.id,
                                        label: question.question
                                    }))}
                                    {...register("firstQuestion", {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        }
                                    })}
                                    setValue={setValue}
                                    isSearch={true}
                                />
                            </div>
                            <span>
                                {errors.firstQuestion
                                    && errors.firstQuestion.type === "required"
                                    && <Errors>This field is required</Errors>
                                }
                            </span>
                        </div>

                        <div className="sm:col-span-3">
                            <Label htmlFor="firstResponse">
                                Answer <Required />
                            </Label>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    id="firstResponse"
                                    placeholder="Enter your answer"
                                    {...register("firstResponse", {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        }
                                    })}
                                />
                            </div>
                            <span>
                                {errors.firstResponse
                                    && errors.firstResponse.type === "required"
                                    && <Errors>This field is required</Errors>
                                }
                            </span>
                        </div>

                        
                        <div className="sm:col-span-3">
                            <Label htmlFor="secondQuestion">
                                Second question <Required />
                            </Label>
                            <div className="mt-2">
                                <Selector
                                    id="secondQuestion"
                                    placeholder="Select question..."
                                    data={question.map((question: Questions) => ({
                                        value: question.id,
                                        label: question.question
                                    }))}
                                    {...register("secondQuestion", {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        }
                                    })}
                                    setValue={setValue}
                                    isSearch={true}
                                />
                            </div>
                            <span>
                                {errors.secondQuestion
                                    && errors.secondQuestion.type === "required"
                                    && <Errors>This field is required</Errors>
                                }
                            </span>
                        </div>

                        <div className="sm:col-span-3">
                            <Label htmlFor="secondResponse">
                                Answer <Required />
                            </Label>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    id="secondResponse"
                                    placeholder="Enter your answer"
                                    {...register("secondResponse", {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        }
                                    })}
                                />
                            </div>
                            <span>
                                {errors.secondResponse
                                    && errors.secondResponse.type === "required"
                                    && <Errors>This field is required</Errors>
                                }
                            </span>
                        </div>


                    </div>


                </div>

                <div className="flex items-center justify-end gap-x-6">
                    <Button
                        type="submit"
                    >
                        Save
                    </Button>
                </div>

                <span>
                    { errorsForm && <Errors>{JSON.stringify(errorsForm)}</Errors> }
                </span>

            </div>
        </form>
    )
}
