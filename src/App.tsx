import Layout from './components/layout/Layout';
import Container from './components/ui/container/Container';
import Tab from './components/ui/tab/Tab';
import { useGetTasksQuery } from './services/api/tasksApi';

export default function App() {
  const { data, isLoading } = useGetTasksQuery();
  return (
    <Layout>
      {/* Project info */}
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
            {isLoading ? <div>0</div> : <div>{data!.length}</div>}
          </div>
          <div className="info-item">
            <div>Closed:</div>
            {isLoading ? (
              <div>0</div>
            ) : (
              <div>{data!.filter((t) => t.status === 'closed').length}</div>
            )}
          </div>
          <div className="info-item">
            <div>In progress:</div>
            {isLoading ? (
              <div>0</div>
            ) : (
              <div>{data!.filter((t) => t.status === 'in-progress').length}</div>
            )}
          </div>
        </Container>
      </div>

      {/* Tasks */}
      <div className="project-tasks">
        {/* Todo tasks */}
        <Tab title="To-do" status={'to-do'} createTaskButtonVisible={true} />
        {/* In-progress tasks */}
        <Tab title="In-progress" status={'in-progress'} createTaskButtonVisible={false} />
        {/* Test tasks */}
        <Tab title="Test" status={'test'} createTaskButtonVisible={false} />
        {/* Closed tasks */}
        <Tab title="Closed" status={'closed'} createTaskButtonVisible={false} />
      </div>
    </Layout>
  );
}
