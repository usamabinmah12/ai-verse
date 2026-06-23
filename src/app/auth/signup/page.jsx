"use client";

import { useState, Suspense } from "react";
import { Card, Button, Link, TextField, Label, InputGroup, Input, Radio, RadioGroup } from "@heroui/react";
import { Eye, EyeSlash, Person, At, ShieldKeyhole } from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

function SignupForm() {
    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignup = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsLoading(true);

        const plan = role === 'user' ? 'user_free' : 'creator_free';

        try {
            const { data, error: authError } = await signUp.email({
                email,
                password,
                name,
                role,
                plan
            });

            if (authError) {
                setError(authError.message || "Something went wrong during signup.");
            } else {
                setSuccess("Account created successfully! Welcome.");
                setName("");
                setEmail("");
                setPassword("");
                router.push(redirectTo);
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md p-6 sm:p-8 bg-slate-900/40 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-sm text-slate-100 relative">
            {/* Header Container */}
            <div className="flex flex-col items-center justify-center gap-1.5 pb-6 border-b border-slate-800/80 mb-6 text-center">
                <h1 className="text-2xl font-black bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Create an account</h1>
                <p className="text-xs sm:text-sm text-slate-400 font-light">Fill in the fields below to get started</p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSignup} className="flex flex-col gap-5">

                {/* Name Field */}
                <TextField isRequired name="name" className="flex flex-col gap-1.5">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Name</Label>
                    <InputGroup className="flex items-center gap-2 border border-slate-800 rounded-xl px-3 bg-slate-950/50 focus-within:border-violet-500/50 transition-colors">
                        <Person className="text-slate-500 pointer-events-none" size={16} />
                        <Input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent py-2.5 text-sm outline-none border-none text-slate-200"
                        />
                    </InputGroup>
                </TextField>

                {/* Email Field */}
                <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</Label>
                    <InputGroup className="flex items-center gap-2 border border-slate-800 rounded-xl px-3 bg-slate-950/50 focus-within:border-violet-500/50 transition-colors">
                        <At className="text-slate-500 pointer-events-none" size={16} />
                        <Input
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent py-2.5 text-sm outline-none border-none text-slate-200"
                        />
                    </InputGroup>
                </TextField>

                {/* Password Field */}
                <TextField isRequired name="password" className="flex flex-col gap-1.5">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Password</Label>
                    <InputGroup className="flex items-center gap-2 border border-slate-800 rounded-xl px-3 bg-slate-950/50 focus-within:border-violet-500/50 transition-colors">
                        <ShieldKeyhole className="text-slate-500 pointer-events-none" size={16} />
                        <Input
                            type={isVisible ? "text" : "password"}
                            placeholder="Choose a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent py-2.5 text-sm outline-none border-none text-slate-200"
                        />
                        <button
                            className="focus:outline-none text-slate-500 hover:text-slate-350 transition cursor-pointer"
                            type="button"
                            onClick={toggleVisibility}
                            aria-label="toggle password visibility"
                        >
                            {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                        </button>
                    </InputGroup>
                </TextField>

                {/* Role Selection */}
                <div className="flex flex-col gap-2.5">
                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">Subscription plan</Label>
                    <RadioGroup defaultValue="user" name="role" onChange={value => setRole(value)} orientation="horizontal" className="gap-4">
                        <Radio value="user">
                            <Radio.Control>
                                <Radio.Indicator />
                            </Radio.Control>
                            <Radio.Content>
                                <Label className="text-sm font-semibold text-slate-350 cursor-pointer">Prompt User</Label>
                            </Radio.Content>
                        </Radio>
                        <Radio value="creator">
                            <Radio.Control>
                                <Radio.Indicator />
                            </Radio.Control>
                            <Radio.Content>
                                <Label className="text-sm font-semibold text-slate-350 cursor-pointer">Creator</Label>
                            </Radio.Content>
                        </Radio>
                    </RadioGroup>
                </div>

                {/* Dynamic Status Badges */}
                {error && (
                    <div className="p-3.5 text-xs font-medium rounded-xl bg-rose-500/10 text-rose-450 border border-rose-500/20">
                        <span className="font-bold">Error:</span> {error}
                    </div>
                )}

                {success && (
                    <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="font-bold">Success:</span> {success}
                    </div>
                )}

                {/* Action Button */}
                <Button
                    type="submit"
                    className="w-full font-bold tracking-wide rounded-xl text-sm h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/15 cursor-pointer"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                >
                    Sign Up
                </Button>

                {/* Navigation Option */}
                <div className="text-center pt-4 border-t border-slate-800/80 mt-2 text-sm text-slate-400 font-light">
                    Already have an account?{" "}
                    <Link href={`/auth/signin?redirect=${redirectTo}`} className="font-semibold text-violet-400 hover:underline cursor-pointer text-sm">
                        Sign in instead
                    </Link>
                </div>

            </form>
        </Card>
    );
}

export default function SignupPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
            <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
            
            <Suspense fallback={
                <div className="w-full max-w-md p-8 bg-slate-900/40 border border-slate-800 rounded-2xl text-center text-slate-400 font-mono text-xs">
                    Creating secure account structure...
                </div>
            }>
                <SignupForm />
            </Suspense>
        </div>
    );
}