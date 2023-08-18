import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Slider,
  Typography,
  FormHelperText,
} from "@mui/material";
import { appConfig } from "../consts";
import { useContext } from "../hooks";
import UpdateIcon from "@mui/icons-material/SaveOutlined";
import ResetIcon from "@mui/icons-material/RestartAlt";
import HelpIcon from "@mui/icons-material/Help";

const Tweaker = () => {
  const {
    setSelectedModel,
    setRepetitionPenalty,
    setTopP,
    setTemperature,
    setMeanGenLen,
    setShiftFillFactor,
    updateConfig,
    top_p,
    temperature,
    mean_gen_len,
    reset,
    shift_fill_factor,
    system,
    setSystem,
    selectedModel,
    repetition_penalty,
  } = useContext();

  return (
    <Box>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="llm-model-label">LLM Model</InputLabel>
        <Select
          labelId="llm-model-label"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          label="LLM Model"
        >
          {appConfig.model_list.map((model, index) => (
            <MenuItem key={index} value={model.local_id}>
              {model.local_id}
            </MenuItem>
          ))}
        </Select>

        <FormHelperText sx={{ fontSize: 10 }}>
          Choose based on capability of your GPU.
        </FormHelperText>
      </FormControl>

      <br />
      <br />

      <TextField
        multiline
        rows={4}
        value={system}
        onChange={(e) => setSystem(e.target.value)}
        fullWidth
        margin="normal"
        label="System context"
        helperText="Contextual information to guide the model's behavior."
      />
      <br />
      <br />

      <InputLabel>Repetition Deterrence</InputLabel>
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
      <InputLabel>Output Diversity</InputLabel>
      <Slider
        size="small"
        value={top_p}
        onChange={(e, newValue) => setTopP(newValue as number)}
        min={0}
        max={1}
        step={0.01}
      />
      <FormHelperText sx={{ mt: -1, fontSize: 10 }}>
        Controls output diversity. Closer to 1 for deterministic outputs.
      </FormHelperText>
      <br />

      <InputLabel>Randomness Level</InputLabel>
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

      <InputLabel>Average Output Length</InputLabel>
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
      <InputLabel>Topic Shift Inertia</InputLabel>
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
          color="primary"
          style={{ marginBottom: 8, marginTop: 8 }}
          startIcon={<UpdateIcon />}
          onClick={updateConfig}
        >
          Save
        </Button>

        <Button
          variant="text"
          color="warning"
          startIcon={<ResetIcon />}
          onClick={reset}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default Tweaker;
