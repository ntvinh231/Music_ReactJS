import ListSongs from 'components/Song/ListSongs';

const HomePage = () => {
  return (
    <div className="grid grid-rows-7 bg-slate-700 h-screen overflow-hidden pb-[7%]">
      {/* span 4 */}
      <ListSongs />
    </div>
  );
}

export default HomePage