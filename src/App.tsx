import Layout from './components/layout/Layout';
import Container from './components/ui/container/Container';

const App = () => {
  return (
    <Layout>
      <h2>Project Name</h2>
      <div className="project-info">
        <Container>
          <div className="info-item">
            <span>Date added:</span>
            <span>31.01.2025</span>
          </div>
          <div className="info-item">
            <span>Deadline:</span>
            <span>3.02.2025</span>
          </div>
          <div className="info-item">
            <span>Participants:</span>
            <span>Alexey</span>
          </div>
        </Container>
        <Container>
          Менеджер для внутреннего пользования, предназначенный для учета статистики и трекинга
          задач.
        </Container>
        <Container>
          <div className="info-item">
            <span>All tasks:</span>
            <span>4</span>
          </div>
          <div className="info-item">
            <span>Closed:</span>
            <span>1</span>
          </div>
          <div className="info-item">
            <span>In progress:</span>
            <span>1</span>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default App;
