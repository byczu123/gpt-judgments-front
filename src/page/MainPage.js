import Navbar from "../component/Navbar";
import {Card} from "react-bootstrap";

const MainPage = () => {
  return (
    <div className="default_main">
      <Navbar />
            <Card className="main_card" body>Celem pracy jest implementacja aplikacji internetowej korzystającej z autoregresyjnego modelu języka GPT-3, która na żądanie generuje treść uzasadnień wyroków sądowych i posiada interfejs do subiektywnej oceny jakości tych uzasadnień. Aplikacja ma na celu zweryfikowanie, czy dla zadanego kazusu, użycie GPT-3 może wspomóc pracę prawnika przez prezentację możliwej linii argumentacyjnej generowanej na podstawie bazy orzeczeń pochodzącej z Systemu Analizy Orzeczeń Sądowych.</Card>
    </div>
  );
};

export default MainPage;
