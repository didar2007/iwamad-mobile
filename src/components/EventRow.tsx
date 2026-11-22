import { Pressable, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  saved: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
};

export default function EventRow({
  event,
  saved,
  onPress,
  onToggleSaved,
}: EventRowProps) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
      style={styles.wrapper}
    >
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{saved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.details}>
            {event.date} - {event.location}
          </Text>
          {saved && (
            <Animated.Text entering={ZoomIn} style={styles.badge}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 6,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  cardPressed: {
    backgroundColor: '#dbeafe',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111827',
  },
  details: {
    fontSize: 14,
    color: '#666666',
    marginTop: 6,
  },
  badge: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d97706',
  },
  action: {
    minHeight: 44,
    width: 96,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 12,
    marginLeft: 8,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});