<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class UserSearchController
 */
final class UserSearchController extends Controller
{
    /**
     * Constructs UserSearchController
     */
    public function __construct(
        protected UserRepositoryInterface $userRepository,
        protected Logger $logger
    ) {
    }

    /**
     * Handles request to find user records that contain the given search string
     */
    public function handle(Request $request): JsonResponse
    {
        $users = $this->userRepository->streamAll($request->query('search_term'));

        $results = [];
        /** @var User $user */
        foreach ($users as $user) {
            $results[] = $user;
        }

        $message = 'Search requested';
        $this->logger->info($message, [
            'search_term' => $request->query('search_term'),
            'search_results' => $results
        ]);

        return response()->json($results, Response::HTTP_OK);
    }
}
