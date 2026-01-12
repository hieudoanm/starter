import { devstack } from '@start/data/devstack';
import { NextPage } from 'next';
import Link from 'next/link';

const HomePage: NextPage = () => {
  const superGroups: string[] = [
    ...new Set(
      devstack.map(({ category, supergroup }) => supergroup || category || '')
    ),
  ];

  const devToolsBySuperGroups = superGroups.map((superGroup) => {
    const devTools = devstack.filter(
      ({ category, supergroup }) =>
        supergroup === superGroup || category === superGroup
    );
    return { superGroup, devTools };
  });

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-2 py-8 text-center">
        {devToolsBySuperGroups.map(({ superGroup, devTools = [] }) => {
          return (
            <div key={superGroup} className="flex flex-col gap-y-2">
              <h1 className="font-semibold">{superGroup}</h1>
              {devTools.map(({ name, url }) => {
                return (
                  <Link
                    key={name}
                    href={url}
                    target="_blank"
                    className="block text-xs underline decoration-dotted underline-offset-4 opacity-50 transition-all hover:text-2xl hover:font-black hover:underline-offset-8 hover:opacity-100">
                    {name}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
