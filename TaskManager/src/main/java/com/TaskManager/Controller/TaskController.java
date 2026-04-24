package com.TaskManager.Controller;

import com.TaskManager.Entity.Task;
import com.TaskManager.repo.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController   {

    @Autowired
    private TaskRepository repo;

    @GetMapping
    public List<Task> getAll(){
        return repo.findAll();
    }

    @PostMapping
    public Task create(@RequestBody Task task){
        return repo.save(task);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){
        repo.deleteById(id);
    }


}
