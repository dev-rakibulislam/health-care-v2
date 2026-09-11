"use client";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useGoogleOLogin, useLogin } from "@/hooks";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { PatientRegistrationZodSchema } from "@/validation";
import z from "zod";

export function RegistrationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: login, isPending: loginPending } = useLogin();
  const { mutate: googleLogin } = useGoogleOLogin();
  const router = useRouter();

  type registrationType = z.infer<typeof PatientRegistrationZodSchema>;
  const defaultValues: registrationType = {
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  };
  const form = useForm({
    defaultValues,
    validators: { onSubmit: PatientRegistrationZodSchema },
    onSubmit: ({ value }) => {
      const registrationData = {
        email: value.email,
        password: value.password,
      };
    },
  });

  const handleGoogleLoginSuccess = (credentialResponse: {
    credential?: string;
  }) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.add({
        title: "fail to google login",
        type: "error",
      });
      return;
    }
    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "success to google login",
            description: "welcome Back",
            type: "success",
          });
        },
        onError: (err) => {
          toast.add({
            title: "fail to google login",
            description: err.message ?? err.message,
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleLoginError = () => {
    toast.add({
      title: "fail to google login",
      type: "error",
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-balance text-muted-foreground">
                  Create your Health Care account
                </p>
              </div>

              <form.Field name="name">
                {(field) => {
                  const isValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>name</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        placeholder="John Doe"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isValid}
                      />

                      {isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="email">
                {(field) => {
                  const isValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.name}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="user@example.com"
                        value={field.state.value}
                        aria-invalid={isValid}
                      />

                      {isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="contactNumber">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      {" "}
                      <FieldLabel htmlFor={field.name}>
                        {" "}
                        Phone Number{" "}
                      </FieldLabel>{" "}
                      <Input
                        id={field.name}
                        name={field.name}
                        type="tel"
                        placeholder="+880 1XXXXXXXXX"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                      />{" "}
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}{" "}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="password">
                {(field) => {
                  const isValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>

                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={showPassword ? "text" : "password"}
                          value={field.state.value}
                          aria-invalid={isValid}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />

                        <button
                          type="button"
                          className="absolute right-5 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeClosed size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>

                      {isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="confirmPassword">
                {(field) => {
                  const isValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      {" "}
                      <FieldLabel htmlFor="password">
                        Confirm Password
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={showConfirmPassword ? "text" : "password"}
                          value={field.state.value}
                          aria-invalid={isValid}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />

                        <button
                          type="button"
                          className="absolute right-5 top-1/2 -translate-y-1/2"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeClosed size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                      {isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <Field>
                <Button disabled={loginPending} type="submit">
                  {loginPending ? <Spinner className="size-7" /> : "submit"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                />
              </Field>
              <FieldDescription className="text-center">
                already have an account? <Link href="/login">login</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="">
            {/** biome-ignore lint/performance/noImgElement: <explanation> */}
            <img
              src="registration.avif"
              alt="registration"
              className=" object-center h-full dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="/">Terms of Service</a>{" "}
        and <a href="/">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
