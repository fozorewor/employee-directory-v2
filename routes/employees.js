import express from "express";
import employees from "#db/employees";

const router = express.Router();

/**
 * GET /employees
 */
router.get("/", (req, res) => {
  res.send(employees);
});

/**
 * GET /employees/random
 * Must come before /:id
 */
router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

/**
 * GET /employees/:id
 */
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

/**
 * POST /employees
 */
router.post("/", (req, res) => {
  const name = req.body?.name;

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).send("Name is required");
  }

  const newEmployee = {
    id: employees.length + 1,
    name,
  };

  employees.push(newEmployee);

  res.status(201).send(newEmployee);
});

export default router;
