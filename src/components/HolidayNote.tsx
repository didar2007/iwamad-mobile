import { Text, StyleSheet } from 'react-native';
import { useHolidays } from '../hooks/useHolidays';

type Props = {
  date: string;
};

export function HolidayNote({ date }: Props) {
  const year = Number(date.slice(0, 4));
  const { data, isPending, isError } = useHolidays(year);

  if (isPending) {
    return <Text style={styles.note}>Checking holidays</Text>;
  }
  if (isError) {
    return <Text style={styles.note}>Holidays unavailable</Text>;
  }

  const holiday = data.find((h) => h.date === date);
  return (
    <Text style={styles.note}>
      {holiday ? `Public holiday: ${holiday.name}` : 'Not a public holiday'}
    </Text>
  );
}

const styles = StyleSheet.create({
  note: { marginTop: 4, fontSize: 14, color: '#555' },
});