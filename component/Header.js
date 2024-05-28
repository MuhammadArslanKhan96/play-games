import React, { useState, useEffect } from 'react';

const Header = ({ tagData, gameData, devData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const handleBodyClick = () => {
      setIsSearchVisible(false);
    };

    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length < 3) {
      setSearchResults([]);
      setIsSearchVisible(false);
      return;
    }

    const results = [];

    for (let i in tagData) {
      if (tagData[i]?.name?.toLowerCase().includes(query.toLowerCase())) {
        if (!results.some((result) => result.type === 'game' && result.id === i)) {
        results.push({ type: 'tag', id: i });
        }
      }
    }

    for (let i in gameData) {
      if (gameData[i].name.toLowerCase().includes(query.toLowerCase())) {
        if (!results.some((result) => result.type === 'game' && result.id === i)) {
          results.push({ type: 'game', id: i });
        }
      }
    }

    for (let i in devData) {
      if (devData[i].name.toLowerCase().includes(query.toLowerCase())) {
        if (!results.some((result) => result.type === 'dev' && result.id === i)) {
          results.push({ type: 'dev', id: i });
        }
      }
    }

    setSearchResults(results.slice(0, 10));
    setIsSearchVisible(results.length > 0);
  };

  const handleSearchClick = (event) => {
    event.stopPropagation();
    if (searchResults.length > 0) {
      setIsSearchVisible(true);
    }
  };

  const handleResultClick = (url) => {
    window.open(url, '_self');
  };

  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '60px',
        backgroundColor: '#1E1F22',
        fontSize: '20px',
        zIndex: 10,
      }}
    >
      <a href="/" target="_self" style={{ color: '#F4F4F4' }}>
        <div
          style={{
            margin: '17px 0 17px 40px',
            float: 'left',
            width: '170px',
          }}
        >
          <b>🐇 Playem.io</b>
        </div>
      </a>

      <div style={{ display: 'inline-block', width: 'calc(100% - 430px)' }}>
        <input
          id="searchBar"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          onClick={handleSearchClick}
          style={{
            display: 'block',
            margin: '15px auto',
            borderRadius: '16px',
            width: '276px',
            height: '30px',
            border: 0,
            paddingLeft: '24px',
            background: '#2F3135',
            color: '#FFF',
          }}
        />
      </div>

      {isSearchVisible && (
        <div
          id="searchResult"
          style={{
            zIndex: 20,
            display: 'block',
            position: 'fixed',
            top: '55px',
            left: 'calc(50% - 150px)',
            fontSize: '13px',
            width: '276px',
            background: '#212326',
            borderRadius: '16px',
            padding: '12px 10px',
          }}
        >
          {searchResults.map((result) => {
            if (result.type === 'game') {
              return (
                <div
                  key={result.id}
                  style={{ lineHeight: '34px', cursor: 'pointer' }}
                  onClick={() => handleResultClick(`/app/${result.id}`)}
                >
                  <img
                    src={`/img/${result.id}.png`}
                    width="30px"
                    height="30px"
                    style={{ borderRadius: '8px', paddingTop: '2px' }}
                    alt={gameData[result.id].name}
                  />
                  <span style={{ verticalAlign: '10px', marginLeft: '6px' }}>
                    {gameData[result.id].name}
                  </span>
                </div>
              );
            } else if (result.type === 'tag') {
              return (
                <div
                  key={result.id}
                  style={{ lineHeight: '34px', cursor: 'pointer' }}
                  onClick={() => handleResultClick(`/tag/${result.id}`)}
                >
                  Tag: {tagData[result.id].name}
                </div>
              );
            } else if (result.type === 'dev') {
              return (
                <div
                  key={result.id}
                  style={{ lineHeight: '34px', cursor: 'pointer' }}
                  onClick={() => handleResultClick(`/dev/${result.id}`)}
                >
                  Dev: {devData[result.id].name}
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default Header;
