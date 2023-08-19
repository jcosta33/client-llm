"use-client";
import {
  InputLabel,
  TextField,
  Button,
  Box,
  Slider,
  FormHelperText,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { useContext } from "../hooks";
import UpdateIcon from "@mui/icons-material/Check";
import ResetIcon from "@mui/icons-material/RestartAlt";
import { appConfig } from "../consts";

const Tweaker = () => {
  const {
    setRepetitionPenalty,
    setTopP,
    setTemperature,
    setMeanGenLen,
    setShiftFillFactor,
    updateConfig,
    selectedModel,
    setSelectedModel,
    chatLoaded,
    top_p,
    temperature,
    mean_gen_len,
    reset,
    shift_fill_factor,
    system,
    setSystem,
    repetition_penalty,
  } = useContext();

  return (
    <Box>
      <FormControl variant="outlined" sx={{ maxWidth: "100%" }}>
        <InputLabel id="llm-model-label">LLM Model</InputLabel>
        <Select
          labelId="llm-model-label"
          value={selectedModel}
          disabled={!chatLoaded}
          onChange={(e) => {
            setSelectedModel(e.target.value);
          }}
          label="LLM Model"
        >
          {appConfig.model_list.map((model, index) => (
            <MenuItem key={index} value={model.local_id}>
              {model.local_id}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <br />
      <TextField
        multiline
        rows={2}
        value={system}
        onChange={(e) => setSystem(e.target.value)}
        fullWidth
        label="System context"
        helperText="Contextual information to guide the model's behavior."
      />
      <br />
      <br />

      <InputLabel>Repetition deterrence</InputLabel>
      <Slider
        size="small"
        value={repetition_penalty}
        onChange={(e, newValue) => setRepetitionPenalty(newValue as number)}
        min={0.5}
        max={2.0}
        step={0.01}
      />
      <FormHelperText sx={{ mt: -1, fontSize: 10 }}>
        Penalizes repeated content. 1 is neutral, {">"}1 reduces, and {"<"}1
        increases repetitions.
      </FormHelperText>
      <br />
      <InputLabel>Output diversity</InputLabel>
      <Slider
        size="small"
        value={top_p}
        onChange={(e, newValue) => setTopP(newValue as number)}
        min={0}
        max={1}
        step={0.01}
      />
      <FormHelperText sx={{ mt: -1, fontSize: 10 }}>
        Controls output diversity. Closer to 0 for deterministic outputs.
      </FormHelperText>
      <br />

      <InputLabel>Randomness level</InputLabel>
      <Slider
        size="small"
        value={temperature}
        onChange={(e, newValue) => setTemperature(newValue as number)}
        min={0}
        max={2}
        step={0.01}
      />
      <FormHelperText sx={{ mt: -1, fontSize: 10 }}>
        Controls randomness. 0 for deterministic outputs, higher for more
        randomness.
      </FormHelperText>
      <br />

      <InputLabel>Average output length</InputLabel>
      <Slider
        size="small"
        value={mean_gen_len}
        onChange={(e, newValue) => setMeanGenLen(newValue as number)}
        min={100}
        max={1500}
        step={1}
      />
      <FormHelperText sx={{ mt: -1, fontSize: 10 }}>
        Desired average length of the generated output.
      </FormHelperText>
      <br />
      <InputLabel>Shift fill factor</InputLabel>
      <Slider
        size="small"
        value={shift_fill_factor}
        onChange={(e, newValue) => setShiftFillFactor(newValue as number)}
        min={0}
        max={2}
        step={0.02}
      />
      <FormHelperText sx={{ mt: -1, fontSize: 10 }}>
        Determines the model's tendency to stick to or shift topics.
      </FormHelperText>
      <br />
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="text"
          sx={{ color: "#999" }}
          startIcon={<ResetIcon />}
          disabled={!chatLoaded}
          onClick={reset}
        >
          Reset
        </Button>
        <Button
          variant="text"
          sx={{ color: "#ccc" }}
          startIcon={<UpdateIcon />}
          disabled={!chatLoaded}
          onClick={updateConfig}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
};

export default Tweaker;
