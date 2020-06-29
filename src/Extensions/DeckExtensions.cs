using System.Linq;
using CoinDay.Models;

namespace System.Collections.Generic
{
    public static class DeckExtensions
    {
        public static Queue<T> Enqueue<T>(this Queue<T> source, IEnumerable<T> items)
        {
            if (source is null)
                throw new ArgumentNullException(nameof(source));
            if (items is null)
                throw new ArgumentNullException(nameof(items));

            return source.EnqueueInternal(items);
        }

        public static IEnumerable<T> Shuffle<T>(this IEnumerable<T> source)
        {
            return source.Shuffle(new Random());
        }

        public static IEnumerable<T> Shuffle<T>(this IEnumerable<T> source, Random random)
        {
            if (source is null)
                throw new ArgumentNullException(nameof(source));
            if (random is null)
                throw new ArgumentNullException(nameof(random));

            return source.ShuffleIterator(random);
        }

        public static int GetScore(this IEnumerable<Card> source)
        {
            if (source is null)
                throw new ArgumentNullException(nameof(source));

            return source
                .OrderByDescending(x => x.Value)
                .Where((x, i) => i == 0 || source.ElementAt(i - 1).Value + 1 < x.Value)
                .Sum(x => x.Value);
        }

        private static IEnumerable<T> ShuffleIterator<T>(this IEnumerable<T> source, Random random)
        {
            var buffer = source.ToList();
            for (int i = 0; i < buffer.Count; i++)
            {
                var j = random.Next(i, buffer.Count);
                yield return buffer[j];

                buffer[j] = buffer[i];
            }
        }

        private static Queue<T> EnqueueInternal<T>(this Queue<T> source, IEnumerable<T> items)
        {
            foreach (var item in items)
            {
                source.Enqueue(item);
            }

            return source;
        }
    }
}