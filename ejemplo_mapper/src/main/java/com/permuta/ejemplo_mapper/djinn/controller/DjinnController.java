package com.permuta.ejemplo_mapper.djinn.controller;

import com.permuta.ejemplo_mapper.djinn.dto.NewDjinnRequest;
import com.permuta.ejemplo_mapper.djinn.dto.DjinnResponse;
import com.permuta.ejemplo_mapper.djinn.service.DjinnService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/djinn")
@RequiredArgsConstructor
public class DjinnController {

    private final DjinnService service;

    @GetMapping
    public List<DjinnResponse> findAll() {
        return service.findAll();
    }

    @PostMapping
    public DjinnResponse create(@Valid @RequestBody NewDjinnRequest request) {
        return service.create(request);
    }
}
