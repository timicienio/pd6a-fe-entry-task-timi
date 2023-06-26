import TodoDetailModal from './TodoDetailModal';

export default function TodoDetailModalPage({ params: { id } }: { params: { id: string } }) {
  return <TodoDetailModal id={id} />;
}
