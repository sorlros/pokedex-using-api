import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import IndexPage from "./pages/IndexPage"
import DetailPage from "./pages/DetailPage"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<IndexPage />} />
				<Route path="/:id" element={<DetailPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
