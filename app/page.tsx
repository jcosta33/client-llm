
import Loader from "./components/loader";
import Wrapper from "./components/wrapper";
import { Provider } from "./context";

export default function Page() {
  return (
    <Provider>
      <Loader />
      <Wrapper />
    </Provider>
  );
}
