"use client";
import * as z from "zod";
import Heading from "@/components/heading";
import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import ReactMarkdown from "react-markdown";
const CodePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount : '1',
      resolution : '512x512'
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([])
      const response = await axios.post("/api/image",values)

      const urls = response.data.map((image :{url : string}) => image.url)
      setImages(urls)

      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Image Generation"
        description="Generate images using prompt."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Fish sitting on a tree"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="lg:col-span-2 col-span-12 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label="No Images generated" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            <h2>Images will be rendered here</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CodePage;
