package com.reposlayers.controllers;

import com.reposlayers.models.ComTime;
import com.reposlayers.repositories.ComTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/comtime")
public class ComTimeController {

    private ComTimeRepository CoRepo;

    @Autowired
    public ComTimeController(ComTimeRepository CoRepo){this.CoRepo=CoRepo;}

    @GetMapping
    public List<ComTime> getalltime(){return CoRepo.findAll();}


}
