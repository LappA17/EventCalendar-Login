import { useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// В качестве дженерика TypedUseSelectorHook мы указываем тот тип который отвечает за состояние нашего приложения и приравниваем его к useSelector
