import { AppConfig, ChatOptions } from "@mlc-ai/web-llm";

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
// override default
// see https://mlc.ai/mlc-llm/docs/get_started/mlc_chat_config.html
export const chatOpts = {
  repetition_penalty: 1.2,
  top_p: 0.8,
  temperature: 0.5,
  mean_gen_len: 1000,
  shift_fill_factor: 0.3,
  conv_config: {
    system:
      "A chat where the assistant understands and responds with expertise in software development. The user is seeking guidance in programming, and the assistant should provide clear, concise, and relevant answers.",
  },
};
