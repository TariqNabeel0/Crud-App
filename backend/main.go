package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"fullstack-crud-app/database"
	"fullstack-crud-app/handlers"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	// Connect to database
	database.Connect()
	defer database.DB.Close()

	// Setup router
	router := mux.NewRouter()

	// API routes
	router.HandleFunc("/api/users", handlers.GetUsers).Methods("GET")
	router.HandleFunc("/api/users", handlers.CreateUser).Methods("POST")
	router.HandleFunc("/api/users/{id}", handlers.GetUser).Methods("GET")
	router.HandleFunc("/api/users/{id}", handlers.UpdateUser).Methods("PUT")
	router.HandleFunc("/api/users/{id}", handlers.DeleteUser).Methods("DELETE")

	// Enable CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:3000",
			"https://crud-app-frontend.vercel.app",
			"https://*.vercel.app",
		},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"*"},
	})

	handler := c.Handler(router)

	// Get port from environment variable or default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}