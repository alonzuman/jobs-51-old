import { useSelector } from 'react-redux';

const useTheme = () => {
  const { translation, theme } = useSelector(state => state.theme);
  return { translation, theme }
}

export default useTheme;
