import Layout from './components/layout/Layout';
import Container from './components/ui/container/Container';

const App = () => {
  return (
    <Layout>
      <h2>Project Name</h2>
      <div className="project-info">
        <Container>
          <div className="info-item">
            <div>Date added:</div>
            <div>31.01.2025</div>
          </div>
          <div className="info-item">
            <div>Deadline:</div>
            <div>03.02.2025</div>
          </div>
          <div className="info-item">
            <div>Participants:</div>
            <div>Alexey</div>
          </div>
        </Container>
        <Container>
          Трекер задач, созданный на React с использованием стейт-менеджера Redux (redux Toolkit,
          RTK Query) с фичей Drag and Drop.
        </Container>
        <Container>
          <div className="info-item">
            <div>All tasks:</div>
            <div>4</div>
          </div>
          <div className="info-item">
            <div>Closed:</div>
            <div>1</div>
          </div>
          <div className="info-item">
            <div>In progress:</div>
            <div>1</div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default App;
