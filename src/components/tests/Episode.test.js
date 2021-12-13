import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';
import Display from '../Display';

const testEpisodeWithImages = {
    id:1,
    name: 'Stranger Things',
    image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
    season: 1,
    number: 1,
    summary: 'Small town full of mysteries',
    runtime: 1
}

const testEpisodeWithoutImages = {
    id:1,
    name: "",
    image: '',
    season: 1,
    number: 1,
    summary: "",
    runtime: 1
}

test("renders without error", () => {
    render(<Display episode={testEpisodeWithImages} />)
});

test("renders the summary test passed as prop", ()=>{
    render(<Display episode={testEpisodeWithImages} />)
    const summary = screen.queryAllByText(`${testEpisodeWithImages.summary}`);
        expect(summary).toBeTruthy();
        expect(summary).not.toBeNull();       
});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={testEpisodeWithoutImages} />)
    const imageInfo = screen.queryByAltText('./stranger_things.png')
        expect(imageInfo).toBeInTheDocument();
        expect(imageInfo).toBeTruthy();
        expect(imageInfo.alt).toEqual('./stranger_things.png')
});
