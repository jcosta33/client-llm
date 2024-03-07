
import { openAIModels, webLLMModels } from "../constants";
import { Context } from "../context";
import { useContext } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormDescription, FormLabel, FormItem, Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ideaFormSchema } from "../schemas";
import { z } from "zod";

const Tweaker = () => {
  const {
    model,
    setModel,
    chatLoading,
    options,
    setSingleOption,
    source,
    setSource,
    reset,
    setOptionsUpdated,
    system,
    setSystem,
  } = useContext(Context);

  const form = useForm<z.infer<typeof ideaFormSchema>>({
    resolver: zodResolver(ideaFormSchema),
    defaultValues: {
      title: "", content: ""
    }
  })

  const onSubmit = (data: z.infer<typeof ideaFormSchema>) => {
    console.log(data);
  }

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <h6 className="text-lg font-semibold">Settings</h6>

          <FormItem className="mb-2">
            <Label id="runtime-label"> Runtime</Label>
            <Select
              value={source}
              onValueChange={(value) => {
                setSource(value);
                if (value === "open-ai") {
                  setModel("gpt-3.5-turbo-16k");
                } else {
                  setModel("Llama-2-7b-chat-hf-q4f32_1");
                }
                setOptionsUpdated(true);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Runtime" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-llm">WebLLM</SelectItem>
                <SelectItem value="open-ai">OpenAI</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>


          <FormItem className="mb-2">
            <Label id="llm-model-label"> Model</Label>
            <Select
              value={model}
              onValueChange={(value) => {
                setModel(value);
                setOptionsUpdated(true);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                {(source === "open-ai" ? openAIModels : webLLMModels).map(
                  (model, index) => (
                    <SelectItem key={index} value={model.name}>
                      {model.label}
                    </SelectItem>
                  )
                )}
              </SelectContent>

            </Select>
          </FormItem>

          <FormItem className="mb-2">
            <FormLabel htmlFor="system">System context</FormLabel>
            <Textarea
              rows={2}
              value={system}
              onChange={(e) => {
                setSystem(e.target.value);
                setOptionsUpdated(true);
              }}
              name="system"
            />
            <FormDescription>
              Contextual information to guide the model&apos;s behavior.
            </FormDescription>
          </FormItem>

          <FormItem className="mb-2">
            <FormLabel>Repetition deterrence</FormLabel>
            <Slider
              defaultValue={[options.repetition_penalty]}
              onValueCommit={([newValue]) => {
                setSingleOption("repetition_penalty", newValue);
                setOptionsUpdated(true);
              }}
              min={0.5}
              max={2.0}
              step={0.01}
            />
            <FormDescription >
              Penalizes repeated content. 1 is neutral, {">"}1 reduces, and {"<"}1
              increases repetitions.
            </FormDescription>
          </FormItem>

          <FormItem className="mb-2">
            <FormLabel>Output diversity</FormLabel>
            <Slider
              defaultValue={[options.top_p]}
              onValueCommit={([newValue]) => {
                setSingleOption("top_p", newValue);
                setOptionsUpdated(true);
              }}
              min={0}
              max={1}
              step={0.01}
            />
            <FormDescription >
              Controls output diversity. Closer to 0 for deterministic outputs.
            </FormDescription>
          </FormItem>

          <FormItem className="mb-2">
            <FormLabel>Randomness level</FormLabel>
            <Slider
              defaultValue={[options.temperature]}
              onValueCommit={([newValue]) => {
                setSingleOption("temperature", newValue);
                setOptionsUpdated(true);
              }}
              min={0}
              max={2}
              step={0.01}
            />
            <FormDescription>
              Controls randomness. 0 for deterministic outputs, higher for more
              randomness.
            </FormDescription>
          </FormItem>

          <FormItem className="mb-2">
            {source === "web-llm" && (
              <>
                <FormLabel>Average output length</FormLabel>
                <Slider
                  defaultValue={[options.mean_gen_len]}
                  onChange={(newValue) => {
                    setSingleOption("mean_gen_len", newValue as any);
                    setOptionsUpdated(true);
                  }}
                  min={100}
                  max={1500}
                  step={1}
                />
                <FormDescription>
                  Desired average length of the generated output.
                </FormDescription>

                <FormLabel>Shift fill factor</FormLabel>
                <Slider
                  defaultValue={[options.shift_fill_factor]}
                  onChange={(newValue) => {
                    setSingleOption("shift_fill_factor", newValue as any);
                    setOptionsUpdated(true);
                  }}
                  min={0}
                  max={2}
                  step={0.02}
                />
                <FormDescription >
                  Determines the model&apos;s tendency to stick to or shift topics.
                </FormDescription>
              </>
            )}
            <>
              <FormLabel>Frequency penalty</FormLabel>
              <Slider
                defaultValue={[options.frequency_penalty]}
                onChange={(newValue) => {
                  setSingleOption("frequency_penalty", newValue as any);
                  setOptionsUpdated(true);
                }}
                min={0}
                max={2}
                step={0.02}
              />
              <FormDescription >
                Determines the model&apos;s tendency to stick to or shift topics.
              </FormDescription>
            </>
          </FormItem>
          <Button
            disabled={chatLoading}
            onClick={reset}
            variant="outline"
          >
            Reset
          </Button>
        </form>
      </Form>
    </div >
  );
};

export default Tweaker;
