import { AppConfig, ChatOptions, ChatModule } from "@mlc-ai/web-llm";

export const appConfig: AppConfig = {
  model_list: [
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-7b-chat-hf-q4f32_1/resolve/main/",
      local_id: "Llama-2-7b-chat-hf-q4f32_1",
    },
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-13b-chat-hf-q4f32_1/resolve/main/",
      local_id: "Llama-2-13b-chat-hf-q4f32_1",
    },
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-7b-chat-hf-q4f16_1/resolve/main/",
      local_id: "Llama-2-7b-chat-hf-q4f16_1",
      required_features: ["shader-f16"],
    },
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-13b-chat-hf-q4f16_1/resolve/main/",
      local_id: "Llama-2-13b-chat-hf-q4f16_1",
      required_features: ["shader-f16"],
    },
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-Llama-2-70b-chat-hf-q4f16_1/resolve/main/",
      local_id: "Llama-2-70b-chat-hf-q4f16_1",
      required_features: ["shader-f16"],
    },
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-RedPajama-INCITE-Chat-3B-v1-q4f32_0/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f32_0",
    },
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-vicuna-v1-7b-q4f32_0/resolve/main/",
      local_id: "vicuna-v1-7b-q4f32_0",
    },
    {
      model_url:
        "https://huggingface.co/mlc-ai/mlc-chat-RedPajama-INCITE-Chat-3B-v1-q4f16_0/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f16_0",
      required_features: ["shader-f16"],
    },
  ],
  model_lib_map: {
    "Llama-2-7b-chat-hf-q4f32_1":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf-q4f32_1-webgpu.wasm",
    "Llama-2-13b-chat-hf-q4f32_1":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-13b-chat-hf-q4f32_1-webgpu.wasm",
    "Llama-2-7b-chat-hf-q4f16_1":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf-q4f16_1-webgpu.wasm",
    "Llama-2-13b-chat-hf-q4f16_1":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-13b-chat-hf-q4f16_1-webgpu.wasm",
    "Llama-2-70b-chat-hf-q4f16_1":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-70b-chat-hf-q4f16_1-webgpu.wasm",
    "vicuna-v1-7b-q4f32_0":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/vicuna-v1-7b-q4f32_0-webgpu-v1.wasm",
    "RedPajama-INCITE-Chat-3B-v1-q4f32_0":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1-q4f32_0-webgpu-v1.wasm",
    "RedPajama-INCITE-Chat-3B-v1-q4f16_0":
      "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1-q4f16_0-webgpu-v1.wasm",
  },
};

export const programmingLanguages: { label: string; name: string }[] = [
  { label: "Python", name: "python" },
  { label: "JavaScript", name: "javascript" },
  { label: "Java", name: "java" },
  { label: "C++", name: "cpp" },
  { label: "C#", name: "csharp" },
  { label: "PHP", name: "php" },
  { label: "Swift", name: "swift" },
  { label: "Go", name: "go" },
  { label: "Ruby", name: "ruby" },
  { label: "TypeScript", name: "typescript" },
  { label: "Kotlin", name: "kotlin" },
  { label: "Rust", name: "rust" },
  { label: "R", name: "r" },
  { label: "Scala", name: "scala" },
  { label: "Perl", name: "perl" },
  { label: "Lua", name: "lua" },
  { label: "Haskell", name: "haskell" },
  { label: "Objective-C", name: "objective-c" },
  { label: "Dart", name: "dart" },
  { label: "MATLAB", name: "matlab" },
];

// override default
// see https://mlc.ai/mlc-llm/docs/get_started/mlc_chat_config.html
export const chatOpts = {
  repetition_penalty: 1.2,
  top_p: 0.8,
  temperature: 0.5,
  mean_gen_len: 500,
  shift_fill_factor: 0,
  conv_config: {
    system:
      "You are a programming partner, focus on outputting code. Any time you output code, be sure to output it in code snippets.",
  },
};

export const chat = new ChatModule();
