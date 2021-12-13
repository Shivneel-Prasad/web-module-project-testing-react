import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const testShow = {
    name: 'Stranger Things',
    summary: "A small town in the 80's that is more than what it seems to be",
    seasons: [
        {id: 0, name: 'Season1', episodes: []},
        {id: 1, name: 'Season2', episodes: []},
        {id: 2, name: 'Season3', episodes: []},
        {id: 3, name: 'Season4', episodes: []},
    ]
}

test('renders without errors', ()=>{
    render(<Show show={testShow} selectedSeason={'none'} />)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />)
    const loadingData = screen.queryByTestId('loading-container')
        expect(loadingData).toBeInTheDocument();
        expect(loadingData).not.toBeNull();
        expect(loadingData).toBeTruthy();
});


test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={testShow} selectedSeason={'none'} />)
    const seasonOptions = screen.queryAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(testShow.seasons.length);
});

test('handleSelect is called when an season is selected', () => {
    const mockHandleSelect = jest.fn()
    render(<Show show={testShow} selectedSeason={'none'} handleSelect={mockHandleSelect} />)
    const SelectSeason = screen.getByLabelText(/Select A Season/i);
        userEvent.selectOptions(SelectSeason, ['1'])
          expect(mockHandleSelect).toHaveBeenCalledTimes(1);
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    render(<Show show={testShow} selectedSeason={0} />)
    const episode = screen.queryByTestId('episodes-container')
        expect(episode).toBeInTheDocument();
    render(<Show show={testShow} selectedSeason={'none'} />)
});
